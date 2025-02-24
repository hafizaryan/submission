const showOn = document.getElementById("addBook"),
  showOff = document.getElementById("close"),
  overlay = document.getElementById("formBook"),
  submitForm = document.getElementById("bookForm"),
  search = document.getElementById("searchBookTitle"),
  searchSubmit = document.getElementById("searchSubmit"),
  unfinished = document.getElementById("incompleteBookshelfList"),
  finished = document.getElementById("completeBookshelfList"),
  STORAGE_KEY = "BOOKSHELF_APPS",
  SAVED_EVENT = "saved-book",
  RENDER_EVENT = "render-book";

let books = [],
  selectedEditBook = [],
  isEdit = false;

const storageExist = () => {
  if (typeof Storage === undefined) {
    alert("Unfortunately, your browser does not support local storage.");
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
  overlay.style.display = "none";

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    isEdit ? saveEditBook() : addBook();
    clear();
    selectedEditBook.length = 0;
  });

  showOn.addEventListener("click", (event) => {
    event.preventDefault();
    clear();
    overlay.style.display = "flex";
  });

  showOff.addEventListener("click", (event) => {
    event.preventDefault();
    overlay.style.display = "none";
    selectedEditBook.length = 0;
  });

  if (storageExist()) loadDataFromStorage();
});

const clear = () => {
  [
    "bookFormTitle",
    "bookFormAuthor",
    "bookFormYear",
    "bookFormCategory",
  ].forEach((id) => (document.getElementById(id).value = ""));
  document.getElementById("bookFormIsComplete").checked = false;
  overlay.style.display = "none";
};

const generateId = () => +new Date();

const generateBookObject = (
  id,
  title,
  author,
  year,
  category,
  isCompleted
) => ({ id, title, author, year, category, isCompleted });

document.addEventListener(RENDER_EVENT, () => {
  console.log(books);
  unfinished.innerHTML = "";
  finished.innerHTML = "";
  books.forEach((book) =>
    (book.isCompleted ? finished : unfinished).append(newBook(book))
  );
});

const addBook = () => {
  books.push(
    generateBookObject(
      generateId(),
      document.getElementById("bookFormTitle").value,
      document.getElementById("bookFormAuthor").value,
      document.getElementById("bookFormYear").value,
      document.getElementById("bookFormCategory").value,
      document.getElementById("bookFormIsComplete").checked
    )
  );
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const newBook = ({ id, title, author, year, category, isCompleted }) => {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
        
        <div class="card-body">
            <div class="content">
                <h3>${title}</h3>
                <p>${author}</p>
                <p>${year}</p>
                <h4>${category}</h4>
            </div>
            <div class="action">
                <button type="button" class="${isCompleted ? "undo" : "done"}">
                    <i class="bi bi-${
                      isCompleted ? "arrow-clockwise" : "check-circle"
                    }"></i>
                </button>
                <button type="button" class="edit"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="delete"><i class="bi bi-trash-fill"></i></button>
            </div>
        </div>
    `;

  card
    .querySelector(".done, .undo")
    .addEventListener("click", () => toggleBookCompletion(id));
  card.querySelector(".edit").addEventListener("click", () => editBook(id));
  card.querySelector(".delete").addEventListener("click", () => deleteBook(id));

  return card;
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
  selectedEditBook = [book];
  overlay.style.display = "flex";
  ["Title", "Author", "Year", "Category"].forEach((field) => {
    document.getElementById(`bookForm${field}`).value =
      book[field.toLowerCase()];
  });
  document.getElementById("bookFormIsComplete").checked = book.isCompleted;
  document.querySelector(".input_section .title-input h2").innerText =
    "Form Edit";
  document.getElementById("bookSubmit").innerText = "Edit Book";
};

const saveEditBook = () => {
  isEdit = false;
  Object.assign(
    findBook(selectedEditBook[0].id),
    generateBookObject(...Object.values(selectedEditBook[0]))
  );
  selectedEditBook.length = 0;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const deleteBook = (bookId) => {
  const bookIndex = findBookIndex(bookId);
  if (bookIndex === -1 || !confirm("Yakin dihapus?")) return;
  books.splice(bookIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

const findBook = (bookId) => books.find((book) => book.id === bookId);
const findBookIndex = (bookId) => books.findIndex((book) => book.id === bookId);

search.addEventListener("keyup", (event) => {
  document.querySelectorAll(".book_list article").forEach((book) => {
    book.style.display = book
      .querySelector(".content h3")
      .innerText.toLowerCase()
      .includes(event.target.value.toLowerCase())
      ? "flex"
      : "none";
  });
});

searchSubmit.addEventListener("click", (event) => event.preventDefault());
