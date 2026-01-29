// --- 1. SELECT DOM ELEMENTS ---
const container = document.querySelector('.container');
const dialog = document.getElementById('dialog');
const form = dialog.querySelector('form');
const showDialog = document.getElementById('showDialog');
const confirmBtn = dialog.querySelector('#confirmBtn');
const cancelBtn = dialog.querySelector('#cancelBtn');
const title = dialog.querySelector('#title');
const author = dialog.querySelector('#author');
const year = dialog.querySelector('#year');

// --- 2. DEFINE FUNCTIONS ---
// let myLibrary = [];

// function Book(title, author, year, isRead) {
//     this.id = crypto.randomUUID();
//     this.title = title;
//     this.author = author;
//     this.year = year;
//     this.isRead = isRead;
// }

// Book.prototype.toggleReadStatus = function () {
//     this.isRead = !this.isRead; 
// }

// function addBookToLibrary (title, author, year, isRead) {
//     const book = new Book(title, author, year, isRead);
//     myLibrary.push(book);
// }

// function displayBook (array) {
//     container.innerHTML = '';
//     array.forEach(element => {
//         // Card container
//         const div = document.createElement('div');
//         div.classList.add('card-container');
//         container.appendChild(div);

//         // Title container
//         const title = document.createElement('p');
//         title.textContent = 'Title : ' + element.title;
//         title.classList.add('title');
//         div.appendChild(title);

//         // Author container
//         const author = document.createElement('p');
//         author.textContent = 'Author : ' + element.author;
//         author.classList.add('author');
//         div.appendChild(author);

//         // Year container
//         const year = document.createElement('p');
//         year.textContent = 'Year : ' + element.year;
//         year.classList.add('year');
//         div.appendChild(year);

//         // ReadStatus container
//         const readStatus = document.createElement('p');
//         readStatus.textContent = 'Have Read? : ' + (element.isRead ? 'Yes' : 'No');
//         readStatus.classList.add('readStatus');
//         div.appendChild(readStatus);

//         // Remove button
//         const removeBtn = document.createElement('button');
//         removeBtn.textContent = 'Remove';
//         removeBtn.classList.add('removeButton');
//         removeBtn.dataset.bookId = element.id; //Assign book ID to button
//         removeBtn.addEventListener('click', (e) => {
//             e.target.closest('.card-container').remove();
//             const idToDelete = e.target.dataset.bookId;
//             myLibrary = myLibrary.filter(obj => obj.id !== idToDelete);
//         })
//         div.appendChild(removeBtn);

//         // Toggle button
//         const toggleBtn = document.createElement('button');
//         toggleBtn.textContent = 'Toggle Read';
//         toggleBtn.classList.add('toggleButton');
//         toggleBtn.dataset.bookId = element.id;
//         toggleBtn.addEventListener('click', () => {
//             const foundBook = myLibrary.find(item => item.id === element.id);
//             foundBook.toggleReadStatus();
//             displayBook(myLibrary);
//         })
//         div.appendChild(toggleBtn);
//     });
// }

// insertBook (event) {
//         event.preventDefault();
//         const bookTitle = title.value;
//         const bookAuthor = author.value;
//         const bookYear = year.value;
//         let haveRead = dialog.querySelector('input[name="isRead"]:checked').value;
//         haveRead === 'Yes' ? haveRead = true : haveRead = false;
//         addBookToLibrary(bookTitle, bookAuthor, bookYear, haveRead);
//         displayBook(myLibrary);
//         dialog.close();
//     }

class Book {
    constructor(title, author, year, isRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.year = year;
        this.isRead = isRead;
    }
    toggleReadStatus() {
       this.isRead = !this.isRead;  
    }
}

class Library {
    myLibrary = [];
    addBookToLibrary(title, author, year, isRead) {
        const book = new Book(title, author, year, isRead);
        this.myLibrary.push(book);
    }
    createBookCard(array) {
        container.innerHTML = '';
        array.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('card-container');
            container.appendChild(card);
    
            const createInfo = (text) => {
                const p = document.createElement('p');
                p.textContent = text;
                return p;
            };

            // Use Template Literals for cleaner strings
            card.appendChild(createInfo(`Title: ${element.title}`));
            card.appendChild(createInfo(`Author: ${element.author}`));
            card.appendChild(createInfo(`Year: ${element.year}`));
            card.appendChild(createInfo(`Have Read?: ${element.isRead ? 'Yes' : 'No'}`));

            // --- BUTTONS (Logic stays the same, just organized) ---
            
            // Remove Button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('removeButton');
            removeBtn.dataset.bookId = element.id; // Use the destructured 'id'
            removeBtn.addEventListener('click', this.handleRemove); // Delegate to a named function
            card.appendChild(removeBtn);

            // Toggle Button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Toggle Read';
            toggleBtn.classList.add('toggleButton');
            toggleBtn.dataset.bookId = element.id;
            toggleBtn.addEventListener('click', this.handleToggle); // Delegate to a named function
            card.appendChild(toggleBtn);
        })   
    }
    insertBook = (event) => {
        event.preventDefault();
        const bookTitle = title.value;
        const bookAuthor = author.value;
        const bookYear = year.value;
        let haveRead = dialog.querySelector('input[name="isRead"]:checked').value;
        haveRead === 'Yes' ? haveRead = true : haveRead = false;
        this.addBookToLibrary(bookTitle, bookAuthor, bookYear, haveRead);
        this.createBookCard(this.myLibrary);
        dialog.close();
    }

    handleRemove = (e) => {
        e.target.closest('.card-container').remove();
        const idToDelete = e.target.dataset.bookId;
        // Filter the global library
        this.myLibrary = this.myLibrary.filter(book => book.id !== idToDelete);
    }

    handleToggle = (e) => {
        const idToToggle = e.target.dataset.bookId;
        const foundBook = this.myLibrary.find(book => book.id === idToToggle);
        foundBook.toggleReadStatus();
        this.createBookCard(this.myLibrary); // Re-render to update the "Yes/No" text
    }
}


const theLibrary = new Library();

// --- 3. ADD EVENT LISTENERS ---
showDialog.addEventListener('click', () => {
    dialog.showModal();
})

form.addEventListener('submit', theLibrary.insertBook);
cancelBtn.addEventListener('click', () => {
    dialog.close();
})