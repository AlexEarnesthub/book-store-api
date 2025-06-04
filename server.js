const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const books = require('./data/books.json');
const users = require('./data/users.json');

// 1. Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 2. Get book by ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) res.json(book);
  else res.status(404).json({ message: 'Kitob topilmadi' });
});

// 3. Get books by author
app.get('/books/author/:author', (req, res) => {
  const authorBooks = books.filter(b => b.author === req.params.author);
  res.json(authorBooks);
});

// 4. Get books by title
app.get('/books/title/:title', (req, res) => {
  const titleBooks = books.filter(b => b.title === req.params.title);
  res.json(titleBooks);
});

// 5. Get review for a book
app.get('/review/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book && book.reviews) res.json(book.reviews);
    else res.status(404).json({ message: 'Review topilmadi' });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username mavjud' });
    }
    users.push({ username, password });
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    res.json({ message: 'Ro‘yxatdan o‘tdingiz' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) res.json({ message: 'Tizimga muvaffaqiyatli kirildi' });
    else res.status(401).json({ message: 'Login xato' });
});
  
app.put('/review/:isbn', (req, res) => {
    const { username, review } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
      if (!book.reviews) book.reviews = {};
      book.reviews.push(review);
      fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
      res.json({ message: 'Review qoshildi/yangi versiyasi saqlandi' });
    } else {
      res.status(404).json({ message: 'Kitob topilmadi' });
    }
});

app.delete('/review/:isbn', (req, res) => {
    const { username } = req.body;
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book && book.reviews) {
      delete book.reviews[username];
      fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
      res.json({ message: 'Review ochirildi' });
    } else {
      res.status(404).json({ message: 'Review topilmadi' });
    }
});
  
  

  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlamoqda`);
});
