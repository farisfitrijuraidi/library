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
