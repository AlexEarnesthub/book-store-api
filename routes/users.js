const express = require('express');
const fs = require('fs');
const router = express.Router();
const usersFile = './data/users.json';

// 6: Foydalanuvchi royxatga qoshish
router.post('/register', (req, res) => {
    const {username, password} = req.body;
    let users = JSON.parse(fs.readFileSync(usersFile));

    if(users.find(u => u.username === username)){
        return res.status(400).json({message: 'Foydalanuvchi allaqachon'});
    }

    users.push({username, password});
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({message: "Foydalanuvchi royxatdan otdi"});
});

// 7: Foydalanuvchi login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync(usersFile));
  
    const user = users.find(u => u.username === username && u.password === password);
    if (user) res.json({ message: 'Tizimga kirdingiz' });
    else res.status(401).json({ message: 'Login yoki parol noto‘g‘ri' });
  });
  
  module.exports = router;