import React, { useState, useEffect } from "react";
import axios from "axios";

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function LogoQuiz({ username, onFinish }) {
  const [logos, setLogos] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState(0);
  const [solutions, setSolutions] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(Date.now());

  useEffect(() => {
    axios.get("http://localhost:5000/api/logos")
      .then(res => {
        const shuffled = shuffle(res.data);
        setLogos(shuffled);
        setGuesses(Array(shuffled.length).fill(""));
        setStartTimestamp(Date.now());
      });
  }, []);

  useEffect(() => {
    if (finished) {
      axios.get("http://localhost:5000/api/logo-solutions")
        .then(res => setSolutions(res.data));
    }
  }, [finished]);

  const handleGuessChange = (e) => {
    const newGuesses = guesses.slice();
    newGuesses[current] = e.target.value;
    setGuesses(newGuesses);
  };

  const handlePrev = () => setCurrent(Math.max(current - 1, 0));
  const handleNext = () => setCurrent(Math.min(current + 1, logos.length - 1));

  const handleFinish = async (e) => {
    e.preventDefault();
    const solutionsResp = await axios.get("http://localhost:5000/api/logo-solutions");
    const logoSolutions = solutionsResp.data;
    let scoreVal = 0;
    const details = guesses.map((guess, i) => {
      const solutionRow = logoSolutions.find(l => l.id === logos[i].id);
      const correct = solutionRow && guess.trim().toLowerCase() === solutionRow.solution.toLowerCase();
      if (correct) scoreVal++;
      return { logo_id: logos[i].id, answer: guess, correct };
    });
    setScore(scoreVal);
    setSolutions(logoSolutions);

    const durationSeconds = Math.round((Date.now() - startTimestamp) / 1000);

    await axios.post("http://localhost:5000/api/result", {
      username,
      score: scoreVal,
      details,
      duration_seconds: durationSeconds
    });
    setFinished(true);
    if (onFinish) onFinish(scoreVal);
  };

  if (!logos.length) return <div className="text-center mt-5">Logók betöltése...</div>;

  if (finished) {
    return (
      <div className="container p-4">
        <h3 className="alert alert-success text-center">Eredmény összesítés</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Helyes válasz</th>
              <th>A te válaszod</th>
              <th>Talált?</th>
            </tr>
          </thead>
          <tbody>
            {logos.map((logo, i) => {
              const sol = solutions.find(l => l.id === logo.id);
              const correct = guesses[i].trim().toLowerCase() === (sol?.solution ?? "").toLowerCase();
              return (
                <tr key={logo.id}>
                  <td>{i + 1}</td>
                  <td>{sol ? sol.solution : ""}</td>
                  <td>{guesses[i]}</td>
                  <td>{correct ? "✓" : "✗"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="alert alert-info text-center">Végső pontszám: <b>{score}</b></div>
      </div>
    );
  }

  const logo = logos[current];
  return (
    <div className="card mt-4 shadow" style={{maxWidth:480, margin: "auto"}}>
      <div className="card-header text-center">
        <b>{username}</b> - {current + 1} / {logos.length}
      </div>
      <div className="card-body text-center">
        {logo && (
          <>
            <img
              src={"/logos/" + logo.filename}
              alt="Logo"
              className="mb-4"
              style={{
                width: '220px',
                height: '180px',
                objectFit: 'contain',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'block',
                margin: '0 auto'
              }}
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Márka neve…"
              value={guesses[current]}
              onChange={handleGuessChange}
              autoFocus
            />

            <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={current === 0}
                onClick={handlePrev}
              >
                Előző
              </button>
              {current < logos.length - 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Következő
                </button>
              )}
            </div>

            {current === logos.length - 1 && (
              <div className="mt-5">
                <button
                  className="btn btn-success btn-lg w-75"
                  style={{margin: "0 auto", display: "block"}}
                  onClick={handleFinish}
                >
                  Befejezés
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}