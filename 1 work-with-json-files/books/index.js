const fs = require('fs/promises');
const path = require('path');
const ObjectId = require('bson-objectid');

const booksPath = path.join(__dirname, 'books.json');

const updateFile = async (books) => {
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

const readAll = async () => {
  const data = await fs.readFile(booksPath);
  const books = JSON.parse(data);
  return books;
}

const findOne = async (bookId) => {
  const books = await readAll();
  const book = books.find(({id}) => id === bookId);
  return book;
}

const add = async ({title, author}) => {
  const books = await readAll();
  const newBook = {
    title,
    author,
    id: ObjectId(),
  };
  books.push(newBook);
  await updateFile(books);
}

const deleteById = async (bookId) => {
  const books = await readAll();
  const bookIndex = books.findIndex(({id}) => id === bookId);
  if (bookIndex === -1) {
    console.log('Book not found');
    return;
  }

  const newBooks = books.filter(({id}) => id !== bookId);

  await updateFile(newBooks);
}

const updateById = async ({id: bookId, title, author}) => {
  const books = await readAll();
  const bookIndex = books.findIndex(({id}) => id === bookId);
  if (bookIndex === -1) {
    console.log('Book not found');
    return;
  }

  const newBooks = books.map((book) => {
    if (book.id !== bookId) {
      return book;
    }

    const newBook = book;
    if (title) {
      newBook.title = title;
    }
    if (author) {
      newBook.author = author;
    }

    return newBook;
  });

  await updateFile(newBooks);
}

module.exports = {
  readAll,
  findOne,
  add,
  deleteById,
  updateById,
}
