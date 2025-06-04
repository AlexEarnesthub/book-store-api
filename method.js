const axios = require('axios');

// 10: Barcha kitoblarni olish (callback)
function getBooksCallback(cb) {
  axios.get('http://localhost:3000/books')
    .then(response => cb(null, response.data))
    .catch(error => cb(error, null));
}

// 11: ISBN bo‘yicha kitobni olish (Promise)
function getBookByISBN(isbn) {
  return axios.get(`http://localhost:3000/books/isbn/${isbn}`);
}

// 12: Muallif bo‘yicha kitoblar (async/await)
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:3000/books/author/${author}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 13: Nomi bo‘yicha kitoblar (async/await)
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:3000/books/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ==== TEST QISMI ====
if (require.main === module) {
  // 10: Callback bilan barcha kitoblar
  getBooksCallback((err, books) => {
    if (err) {
      console.error('Xatolik (callback):', err.message);
    } else {
      console.log('Barcha kitoblar (callback):', books);
    }
  });

  // 11: Promise bilan ISBN orqali qidirish
  getBookByISBN('1234567890')
    .then(response => {
      console.log('ISBN boyicha topildi (promise):', response.data);
    })
    .catch(error => {
      console.error('Xatolik (promise):', error.message);
    });

  // 12: Async/await bilan muallif bo‘yicha qidirish
  (async () => {
    try {
      const authorBooks = await getBooksByAuthor('Sherzodxo\'ja');
      console.log('Muallif boyicha topildi (async):', authorBooks);
    } catch (error) {
      console.error('Xatolik (author async):', error.message);
    }
  })();

  // 13: Async/await bilan nom bo‘yicha qidirish
  (async () => {
    try {
      const titleBooks = await getBooksByTitle('Node.js');
      console.log('Nomi boyicha topildi (async):', titleBooks);
    } catch (error) {
      console.error('Xatolik (title async):', error.message);
    }
  })();
}

module.exports = {
  getBooksCallback,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle 
};
