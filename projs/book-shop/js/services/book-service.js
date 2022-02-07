const BOOKS_KEY = "book_DB";
var gBooks;
var imgLst = ["css", "html", "react", "civet" , "data", "info", "vi"];
_createBooks();

function _createBook(title, price) {
  var book = {
    id: makeId(),
    title,
    price,
    img: imgLst[getRandomIntInclusive(0, imgLst.length - 1)],
    desc: makeLorem(),
    rate: 0,
  };
  return book;
}

function _createBooks() {
  var books = loadFromStorage(BOOKS_KEY);
  if (!books || !books.length) {
    books = [
      _createBook("CSS: The Definitive Guide, 4th Edition", 21),
      _createBook("Html-Xhtml The Definitive Guide, 6th Edition", 24),
      _createBook("Learning React, 2nd Edition", 30),
    ];
  }
  gBooks = books;
  _saveBooksToStorage();
}

function getBooks() {
  return gBooks;
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id);
  return book;
}

function updateBook(bookId, newPrice) {
  const book = getBookById(bookId);
  book.price = newPrice;
  _saveBooksToStorage();
}

function changeRate(bookId, change) {
  const book = getBookById(bookId);
  currRate = book.rate;
  if (0 <= currRate + change && currRate + change <=10) {
    book.rate += change;
  }
  saveToStorage();
}

function addBook(title, price) {
  const book = _createBook(title, price);
  gBooks.unshift(book);
  _saveBooksToStorage();
  return book;
}

function checkNoBooks() {
  const books = loadFromStorage(BOOKS_KEY);
  return !books || !books.length;
}

function _saveBooksToStorage() {
  saveToStorage(BOOKS_KEY, gBooks);
}

function getBookRating(bookId) {
  return getBookById(bookId).rate;
}
