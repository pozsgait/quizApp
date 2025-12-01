import React, { useState, useEffect } from "react";
import axios from "axios";

// titkos jelszó
const ADMIN_PASSWORD = "titkosjelszo2024";

export default function AdminResults() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [results, setResults] = useState([]);
  const [logoSolutions, setLogoSolutions] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Hibás jelszó!");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      axios.get("http://localhost:5000/api/result")
        .then(res => setResults(res.data));
      axios.get("http://localhost:5000/api/logo-solutions")
        .then(res => setLogoSolutions(res.data));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div className="container mt-5" style={{maxWidth:420}}>
        <h3 className="mb-3">Admin bejelentkezés</h3>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Jelszó"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            autoFocus
          />
          <button className="btn btn-primary w-100" type="submit">Belépés</button>
        </form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    );
  }

  if (!results.length || !logoSolutions.length) return <div className="mt-5">Eredmények betöltése...</div>;

  return (
    <div className="container mt-5">
      <h3>Versenyzői válaszok összehasonlítása a helyes megoldásokkal</h3>
      {results.map((res, i) => {
        const details = typeof res.details === "string" ? JSON.parse(res.details) : res.details;
        return (
          <div key={res.id} className="card mb-4 shadow">
            <div className="card-header">
              <b>{res.username}</b> &mdash; {new Date(res.datetime).toLocaleString()} &mdash; {res.score} pont &mdash; {res.duration_seconds} mp
            </div>
            <div className="card-body">
              <table className="table table-sm table-borderless">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Helyes válasz</th>
                    <th>Felhasználó válasza</th>
                    <th>Talált?</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((ans, j) => {
                    const solRow = logoSolutions.find(ls => ls.id === ans.logo_id);
                    return (
                      <tr key={j}>
                        <td>{j + 1}</td>
                        <td>{solRow ? solRow.solution : ""}</td>
                        <td>{ans.answer}</td>
                        <td>{ans.correct ? "✓" : "✗"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}