const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Data user sederhana
const users = [
  { username: "admin", password: "1234" },
  { username: "user1", password: "abcd" }
];

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, token: '12345' }); // token sederhana
  } else {
    res.json({ success: false, message: 'Username atau password salah' });
  }
});

// Ambil UID
app.get('/api/uid', (req, res) => {
  const token = req.headers['authorization'];
  if (token !== '12345') return res.status(403).json({ error: 'Unauthorized' });
  res.json({ uids: ['10001','10002','10003','10004','10005','10006'] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
