// --- 1. SELECT DOM ELEMENTS ---
const container = document.querySelector('.container');
const dialog = document.getElementById('dialog');
const showDialog = document.getElementById('showDialog');
const confirmBtn = dialog.querySelector('#confirmBtn');
const title = dialog.querySelector('#title');
const author = dialog.querySelector('#author');
const year = dialog.querySelector('#year');

// --- 2. DEFINE FUNCTIONS ---
const myLibrary = [];

function Book(title, author, year, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.year = year;
    this.isRead = isRead;
}

function addBookToLibrary (title, author, year, isRead) {
    const book = new Book(title, author, year, isRead);
    myLibrary.push(book);
}

function displayBook (array) {
    container.innerHTML = '';
    array.forEach(element => {
        const div = document.createElement('div');
        container.appendChild(div);
        const title = document.createElement('p');
        title.textContent = element.title;
        div.appendChild(title);
        const author = document.createElement('p');
        author.textContent = element.author;
        div.appendChild(author);
        const year = document.createElement('p');
        year.textContent = element.year;
        div.appendChild(year);
        const readStatus = document.createElement('p');
        readStatus.textContent = element.isRead;
        div.appendChild(readStatus);
    });
}

function insertBook (event) {
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookYear = year.value;
    const haveRead = dialog.querySelector('input[name="isRead"]:checked').value;
    addBookToLibrary(bookTitle, bookAuthor, bookYear, haveRead);
    displayBook(myLibrary);
    dialog.close();
}

// --- 3. ADD EVENT LISTENERS ---
showDialog.addEventListener('click', () => {
    dialog.showModal();
})

confirmBtn.addEventListener('click', insertBook);