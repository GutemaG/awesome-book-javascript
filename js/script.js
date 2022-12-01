// eslint-disable-next-line max-classes-per-file
const app = document.querySelector('#app');
const navBar = document.createElement('nav');
navBar.classList.add('nav');

navBar.innerHTML = `  
    <ul class="nav-items">
      <li class="nav-item" >
        <a href="#" name='book-list'>Awesome books </a>
      </li>
      <li class="nav-item" >
          <a href="#" name='book-list' >List</a>
      </li>
      <li class="nav-item">
        <a href="#" name='add-new'>Add New</a>
      </li>
      <li class="nav-item">
        <a href="#" name='contact'>Contact</a>
      </li>
    </ul>
`;
app.appendChild(navBar);

const bookListContainer = document.createElement('div');
bookListContainer.classList.add('book-list');

const headerText = document.createElement('h1');
headerText.classList.add('leading-text');
headerText.innerText = 'Awesome Books';
bookListContainer.appendChild(headerText);

const noBookExistMessage = document.createElement('h1');
noBookExistMessage.classList.add('no-book');
noBookExistMessage.innerText = 'No Books are available';
noBookExistMessage.style.display = 'none';
bookListContainer.appendChild(noBookExistMessage);

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
bookListContainer.appendChild(bookList);
app.appendChild(bookListContainer);

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
formContainer.classList.add('form-container', 'add-new');

const headerText2 = document.createElement('h1');
headerText2.classList.add('leading-text');
headerText2.innerText = 'Add a new book';
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

const contactContainer = document.createElement('div');
contactContainer.classList.add('contact');
contactContainer.innerHTML = `
  <h1 class="leading-text">Contact information</h1>
  <p>Do you have any question or you just say "Hello"?</p>
  <p>You can reach out to us! </p>
  <ul>
    <li>our e-mail <span>bir13gud17@gmail.com</span></li>
    <li>our phone number <span>+2519 21641744</span></li>
    <li>our Address <span>Adama, Ethiopia</span></li>
  </ul>
`;
app.appendChild(contactContainer);

const classList = ['book-list', 'add-new', 'contact'];
document.querySelector('.add-new').style.display = 'none';
document.querySelector('.contact').style.display = 'none';

function changeNavigation(navigation) {
  classList.forEach((c) => {
    if (c === navigation) {
      document.getElementsByClassName(navigation)[0].style.display = 'flex';
      document.title = navigation;
    } else {
      document.getElementsByClassName(c)[0].style.display = 'none';
    }
  });
}

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((n) => {
  n.addEventListener('click', (event) => {
    const navigation = event.target.name;
    changeNavigation(navigation, n);
  });
});

const footerContainer = document.createElement('footer');
footerContainer.classList.add('footer');
footerContainer.innerHTML = `
  <p>@copywrite</p>
`;

app.appendChild(footerContainer);