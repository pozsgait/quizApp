import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogoQuiz from "./components/LogoQuiz";
import AdminResults from "./components/AdminResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainQuiz />} />
        <Route path="/admin" element={<AdminResults />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainQuiz() {
  const [username, setUsername] = React.useState("");
  const [started, setStarted] = React.useState(false);

  return (
    <div className="container p-4">
      <h1 className="mb-4 text-center">Logo Quiz</h1>
      {!started ? (
        <form className="card p-4 mx-auto" style={{maxWidth:400}} onSubmit={e => {e.preventDefault(); if (username.trim()) setStarted(true); }}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Felhasználónév</label>
            <input
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Játék indítása</button>
        </form>
      ) : (
        <LogoQuiz username={username} />
      )}
    </div>
  );
}

export default App;