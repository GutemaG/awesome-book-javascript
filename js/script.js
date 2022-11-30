// eslint-disable-next-line max-classes-per-file
const app = document.querySelector('#app');

const headerText = document.createElement('h1');
headerText.classList.add('leading-text');
headerText.innerText = 'Awesome Books';
app.appendChild(headerText);

const noBookExistMessage = document.createElement('h1');
noBookExistMessage.classList.add('no-book');
noBookExistMessage.innerText = 'No Books are available';
noBookExistMessage.style.display = 'none';
app.appendChild(noBookExistMessage);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor(books) {
    this.books = books;
  }

  addBook(title, author) {
    const books = new Book(title, author);
    this.books.push(books);
    this.setToLocalStorage();
  }

  removeBook(index) {
    this.books = this.books.filter((book, bookIndex) => bookIndex !== index);
    // eslint-disable-next-line no-use-before-define
    displayBooks();
    this.setToLocalStorage();
  }

  setToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(this.books));
  }

  getBooks() {
    return this.books;
  }
}

function getDataFromLocalStorage(key) {
  let data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
    return data;
  }
  return [];
}

const bookCollection = new BookCollection(getDataFromLocalStorage('data'));

const bookList = document.createElement('ul');
bookList.classList.add('books');
app.appendChild(bookList);

function displayBooks() {
  const b = bookCollection.getBooks();
  bookList.innerHTML = '';
  if (b.length) {
    bookList.style.display = 'block';
    b.forEach((book, index) => {
      const list = document.createElement('li');
      list.classList.add('book');
      list.innerHTML = `
      <p class='book-title-author'>
        <span class='book-title'> "${book.title}" </span> by
        <span class='book-author'> ${book.author} <span>
      </p>
        <button class='btn remove' onClick="bookCollection.removeBook(${index})"> Remove </button>
      
      `;
      bookList.appendChild(list);
    });
  } else {
    noBookExistMessage.style.display = 'block';
    bookList.style.display = 'none';
  }
}
displayBooks();

const formContainer = document.createElement('div');
formContainer.classList.add('form-container');

const headerText2 = document.createElement('h1');
headerText2.classList.add('leading-text');
headerText2.innerText = 'Add new book';
formContainer.appendChild(headerText2);

const addBookForm = document.createElement('form');
addBookForm.setAttribute('id', 'add-book-form');
addBookForm.innerHTML = `
  <div>
    <input type="text" name="title" id="title" required placeholder='Enter Book Title'/>
  </div>
  <div>
    <input type="text" name="author" id="author" required placeholder='Enter Book Author'/>
  </div>
  <input type="submit" value="Add" class='btn submit'>
`;

formContainer.appendChild(addBookForm);
app.appendChild(formContainer);

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;
  bookCollection.addBook(title, author);
  noBookExistMessage.style.display = 'none';
  displayBooks();
  addBookForm.title.value = '';
  addBookForm.author.value = '';
});
