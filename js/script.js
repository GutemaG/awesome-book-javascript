const app = document.querySelector('#app');

const headerText = document.createElement('h1');
headerText.classList.add('leading-text');
headerText.innerText = 'Awesome Books';
app.appendChild(headerText);

const noBookExistMessage = document.createElement('h3');
noBookExistMessage.classList.add('no-book');
noBookExistMessage.innerText = 'No Books are available';
noBookExistMessage.style.display = 'none';
app.appendChild(noBookExistMessage);

let books = [];

function getData() {
  const data = JSON.parse(localStorage.getItem('data'));

  if (data) {
    books = data;
  }
}
getData();

const bookList = document.createElement('ul');
bookList.classList.add('books');

function displayBooks() {
  bookList.innerHTML = '';
  if (books.length) {
    books.forEach((book, index) => {
      const list = document.createElement('li');
      list.classList.add('book');
      list.innerHTML = `
        <p class='book-title'> ${book.title} </p>
        <p class='book-author'> ${book.author} </p>
        <button class='btn remove' onClick="removeBook(${index})"> Remove </button>
        <hr class='separator'>
      `;
      bookList.appendChild(list);
    });
  } else {
    noBookExistMessage.style.display = 'block';
  }
}

// eslint-disable-next-line no-unused-vars
function removeBook(index) {
  books = books.filter((book, bookIndex) => index !== bookIndex);
  localStorage.setItem('data', JSON.stringify(books));
  displayBooks();
}

displayBooks();
app.appendChild(bookList);

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
app.appendChild(addBookForm);

function CreateBookObject(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(title, author) {
  const newBookObject = new CreateBookObject(title, author);
  books.push(newBookObject);
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;
  addBook(title, author);
  noBookExistMessage.style.display = 'none';
  displayBooks();
  localStorage.setItem('data', JSON.stringify(books));
  addBookForm.title.value = '';
  addBookForm.author.value = '';
});
