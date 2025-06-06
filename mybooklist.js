// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Global flags
let isEditMode = false;
let editRow = null;

// Storage Utility Class
class Store {
  static getBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : []; /*  Parse the JSON string using JSON.parse() to convert it into 
                                                                      a JavaScript array of book objects.    */
  }

  static saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    Store.saveBooks(books);
  }

  static removeBook(isbn) {
    const books = Store.getBooks().filter(book => book.isbn !== isbn);
    Store.saveBooks(books);
  }

  static updateBook(oldIsbn, updatedBook) {
    let books = Store.getBooks();
    books = books.map(book => book.isbn === oldIsbn ? updatedBook : book);
    Store.saveBooks(books);
  }
}

// UI class
class UI {
  static displayBooks() {
    const storedBooks = Store.getBooks();
    storedBooks.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      <td><a href="#" class="ed">edit</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      if (isEditMode) {
        alert("Sorry, delete is disabled while editing.");
        return;
      }
      const row = el.parentElement.parentElement;
      const isbn = row.children[2].textContent;
      row.remove();
      Store.removeBook(isbn);
    }
  }

  static editBook(el) {
    if (el.classList.contains('ed')) {
      const row = el.parentElement.parentElement;

      // Store values and current row globally
      editRow = row;

      const title = row.children[0].textContent;
      const author = row.children[1].textContent;
      const isbn = row.children[2].textContent;

      document.querySelector('#title').value = title;
      document.querySelector('#author').value = author;
      document.querySelector('#isbn').value = isbn;

      document.querySelector('.butt').textContent = 'Update Book';

      const deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';                           //The element does not react to pointer events
        btn.style.opacity = '0.5';
      });

      isEditMode = true;
    }
  }
}

// Load books on page load
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add / Update a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  if (title === '' || author === '' || isbn === '') {
    alert("Please fill all the blanks");
  } else {
    const book = new Book(title, author, isbn);

    if (isEditMode && editRow) {
      const oldIsbn = editRow.children[2].textContent;
      editRow.remove();
      UI.addBookToList(book);
      Store.updateBook(oldIsbn, book);

      isEditMode = false;
      editRow = null;
      document.querySelector('.butt').textContent = 'Add Book';

      const deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach(btn => {
        btn.style.pointerEvents = 'auto';           //The element reacts to pointer events, like :hover and click. This is default
        btn.style.opacity = '1';
      });
    } else {
      UI.addBookToList(book);
      Store.addBook(book);
    }

    UI.clearFields();
  }
});

// Delete or Edit buttons

document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  UI.editBook(e.target);
});
