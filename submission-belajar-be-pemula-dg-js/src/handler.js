/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  // validasi nama books
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // validasi readPage
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((b) => b.id === id).length > 0;

  //   Memeriksa apakah books berhasil ditambahkan
  if (isSuccess) {
    // validasi berhasil
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  // validasi name
  if (name !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  // validasi reading
  if (reading !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.reading === (reading === "1"))
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  // validasi finished
  if (finished !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.finished === (finished === "1"))
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }
  // jika tidak memasukkan query parameter
  const response = h.response({
    status: "success",
    data: {
      books: books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getSpecifiedBook = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];
  // validasi keberadaan buku
  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  // validasi nama books
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // validasi readPage
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
  // validasi keberadaan buku
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    // validasi berhasil
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  // validasi gagal
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  // validasi keberadaan buku
  if (index !== -1) {
    books.splice(index, 1);
    // validasi berhasil
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  // validasi gagal
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = {
  addBook,
  getAllBooks,
  getSpecifiedBook,
  editBookById,
  deleteBookById,
};
