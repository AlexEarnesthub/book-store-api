const express = require('express');
const fs = require('fs');
const router = express.Router();
const booksFile = './data/books.json';

// 1.Barcha kitoblar
router.get('/', async (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile));
    res.json(books);
});

// 2. Kitob ISBN boyicha
router.get('/isbn/:isbn', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile));
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) res.json(book);
    else res.status(404).json({message: "Kitob topilmadi!"});
});

// 3. Muallif boyicha
router.get('/author/:author', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile));
    const results = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
    res.json(results);
});

// 4. Nomi boyicha
router.get('/title/:title', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile));
    const results = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    res.json(results);
});

// 5. Kitobga yozilgan rasmiy fikrar
router.get('/:isbn/review', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile));
    const book = books.find(b => b.isbn === req.params.isbn);
    if(book) res.json(book.reviews);
    else res.status(404).json({message: "Kitob topilmadi!"});
});

// 8. Rasmiy fikr qo'shish yoki yangilash
router.post('/:isbn/review', (req, res) => {
    const { username, review} = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if(!book) return res.status(404).json({message: "Kitob topilmadi!"});

    const existing = book.reviews.find(r => r.username === username);
    if(existing ) existing.text = review;
    else book.reviews.push({username, text: review});

    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
    res.json({message: "Sharh qoshildi va yangilandi!"});
});

// 9. Sharhni o'chirish
router.delete('/isbn/review', (req,res) => {
    const {username} = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    
    if(!book) return res.status(404).json({message: "Kitob topilmadi!"});

    book.reviews = book.reviews.filter(r => r.username !== username);
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
    res.json({message: "Sharh ochirildi!"});
})

module.exports = router;
