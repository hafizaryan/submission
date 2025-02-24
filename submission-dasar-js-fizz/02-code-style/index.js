const books = {};

const getBooks = () => books;

const getBookById = (id) => {
  const book = books[id];
  return book ? book.id : null;
};

const saveBook = (book) => {
  books[book.id] = book;
};

saveBook({ id: "book-1", name: "Book 1" });
const myBooks = getBooks();
const myBook = getBookById("book-1");

console.log(myBooks);
console.log(myBook);
