const container = document.querySelector('.container');

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
        readStatus.textContent = element.readStatus;
        div.appendChild(readStatus);
    });
}

addBookToLibrary('The Hobbit', 'Tolkien', 1937, false);
addBookToLibrary('1984', 'George Orwell',1949, false);
addBookToLibrary('To Kill A Mockingbird', 'Harper Lee', 1960, true);
displayBook(myLibrary);