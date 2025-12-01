app.post('/api/result', async (req, res) => {
  const { username, score, details, duration_seconds } = req.body;
  const conn = await mysql.createConnection(DB_CONFIG);
  await conn.query(
    'INSERT INTO results (username, datetime, score, details, duration_seconds) VALUES (?, NOW(), ?, ?, ?)',
    [username, score, JSON.stringify(details), duration_seconds]
  );
  res.status(201).json({ success: true });
});