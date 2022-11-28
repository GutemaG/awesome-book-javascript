const app = document.querySelector('#app');

const headerText = document.createElement('h1');
headerText.innerText = 'Awesome Books';
app.appendChild(headerText);

let books = [ {title:'title', author: 'author', id:1} ]
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
  books.forEach((book) => {
    const list = document.createElement('li');
    list.classList.add('book');
    list.innerHTML = `
      <p class='book-title'> ${book.title} </p>
      <p class='book-author'> ${book.author} </p>
      <button class='btn remove' onClick="removeBook(${book.id})"> Remove </button>
      <hr>
    `;
    bookList.appendChild(list);
  });
}

// eslint-disable-next-line no-unused-vars
function removeBook(id) {
  books = books.filter((book) => book.id !== id);
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
  <input type="submit" value="Add" class='submit'>
`;
app.appendChild(addBookForm);

function CreateBookObject(title, author) {
  this.title = title;
  this.author = author;
  this.id = books.length + 1;
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;

  const newBookObject = new CreateBookObject(title, author);
  books.push(newBookObject);
  displayBooks();
  localStorage.setItem('data', JSON.stringify(books));
  addBookForm.title.value = '';
  addBookForm.author.value = '';
});
