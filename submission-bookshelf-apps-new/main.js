const submitForm = document.getElementById("bookForm"),
  searchInput = document.getElementById("searchBookTitle"),
  searchSubmit = document.getElementById("searchSubmit"),
  incompleteBookList = document.getElementById("incompleteBookList"),
  completeBookList = document.getElementById("completeBookList"),
  STORAGE_KEY = "BOOKSHELF_APPS",
  SAVED_EVENT = "saved-book",
  RENDER_EVENT = "render-book";

let books = [],
  selectedEditBook = null,
  isEdit = false;

const storageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
};

const saveData = () => {
  if (storageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
};

document.addEventListener(SAVED_EVENT, () =>
  console.log(localStorage.getItem(STORAGE_KEY))
);

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  if (serializedData) books = JSON.parse(serializedData);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", () => {
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    isEdit ? saveEditBook() : addBook();
    clearForm();
    selectedEditBook = null;
  });

  if (storageExist()) loadDataFromStorage();
});

const clearForm = () => {
  document.getElementById("bookFormTitle").value = "";
  document.getElementById("bookFormAuthor").value = "";
  document.getElementById("bookFormYear").value = "";
  document.getElementById("bookFormIsComplete").checked = false;
  isEdit = false;
};

const generateId = () => +new Date();

const generateBookObject = (id, title, author, year, isCompleted) => ({
  id,
  title,
  author,
  year,
  isCompleted,
});

document.addEventListener(RENDER_EVENT, () => {
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = createBookElement(book);
    (book.isCompleted ? completeBookList : incompleteBookList).append(
      bookElement
    );
  });
});

const addBook = () => {
  const newBook = generateBookObject(
    generateId(),
    document.getElementById("bookFormTitle").value,
    document.getElementById("bookFormAuthor").value,
    document.getElementById("bookFormYear").value,
    document.getElementById("bookFormIsComplete").checked
  );
  books.push(newBook);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const createBookElement = ({ id, title, author, year, isCompleted }) => {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-item");
  bookContainer.setAttribute("data-bookid", id);
  bookContainer.innerHTML = `
    <h3 data-testid="bookItemTitle">${title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${author}</p>
    <p data-testid="bookItemYear">Tahun: ${year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${
        isCompleted ? "Belum selesai dibaca" : "Selesai dibaca"
      }</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;

  bookContainer
    .querySelector("[data-testid='bookItemIsCompleteButton']")
    .addEventListener("click", () => toggleBookCompletion(id));
  bookContainer
    .querySelector("[data-testid='bookItemEditButton']")
    .addEventListener("click", () => editBook(id));
  bookContainer
    .querySelector("[data-testid='bookItemDeleteButton']")
    .addEventListener("click", () => deleteBook(id));

  return bookContainer;
};

const toggleBookCompletion = (bookId) => {
  const book = findBook(bookId);
  if (!book) return;
  book.isCompleted = !book.isCompleted;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const editBook = (bookId) => {
  isEdit = true;
  const book = findBook(bookId);
  if (!book) return;
  selectedEditBook = book;
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isCompleted;
};

const saveEditBook = () => {
  if (!selectedEditBook) return;
  selectedEditBook.title = document.getElementById("bookFormTitle").value;
  selectedEditBook.author = document.getElementById("bookFormAuthor").value;
  selectedEditBook.year = document.getElementById("bookFormYear").value;
  selectedEditBook.isCompleted =
    document.getElementById("bookFormIsComplete").checked;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  selectedEditBook = null;
};

const deleteBook = (bookId) => {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1 || !confirm("Yakin ingin menghapus buku ini?")) return;
  books.splice(bookIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const findBook = (bookId) => books.find((book) => book.id === bookId);
const findBookIndex = (bookId) => books.findIndex((book) => book.id === bookId);

searchInput.addEventListener("keyup", (event) => {
  const searchValue = event.target.value.toLowerCase();
  document.querySelectorAll("[data-testid='bookItem']").forEach((book) => {
    book.style.display = book
      .querySelector("[data-testid='bookItemTitle']")
      .innerText.toLowerCase()
      .includes(searchValue)
      ? "block"
      : "none";
  });
});

searchSubmit.addEventListener("click", (event) => event.preventDefault());
