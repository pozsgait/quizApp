const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const DB_CONFIG = {
  host: "localhost",
  user: "YOURUSER",
  password: "YOURPASS",
  database: "logoquiz"
};

app.get('/api/logos', async (req, res) => {
  const conn = await mysql.createConnection(DB_CONFIG);
  const [rows] = await conn.query('SELECT id, filename FROM logos');
  res.json(rows);
});

app.get('/api/logo-solutions', async (req, res) => {
  const conn = await mysql.createConnection(DB_CONFIG);
  const [rows] = await conn.query('SELECT id, solution FROM logos');
  res.json(rows);
});

app.get('/api/result', async (req, res) => {
  const conn = await mysql.createConnection(DB_CONFIG);
  const [rows] = await conn.query('SELECT * FROM results ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/result', async (req, res) => {
  const { username, score, details, duration_seconds } = req.body;
  const conn = await mysql.createConnection(DB_CONFIG);
  await conn.query(
    'INSERT INTO results (username, datetime, score, details, duration_seconds) VALUES (?, NOW(), ?, ?, ?)',
    [username, score, JSON.stringify(details), duration_seconds]
  );
  res.status(201).json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});