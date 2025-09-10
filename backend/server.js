const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// user login sederhana
const USERS = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "password" }
];

app.use(cors());
app.use(bodyParser.json());

// login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if(user){
    res.json({ success: true, username: user.username });
  } else {
    res.json({ success: false, message: "Username atau password salah" });
  }
});

// contoh endpoint ambil UID
app.get('/api/uid', (req, res) => {
  const uidList = ["10001","10002","10003","10004","10005"];
  res.json({ uids: uidList });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
