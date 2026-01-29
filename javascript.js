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
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let myLibrary = [];

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

// Refactored: Book Factory
const createBook = (title, author, year, isRead) => {
  // We explicitly create the ID here
  const id = crypto.randomUUID();

  // We explicitly return an object
  return {
    id,
    title,
    author,
    year,
    isRead,
    toggleReadStatus() {
      this.isRead = !this.isRead;
    }
  };
};

// Usage (Notice: no 'new' keyword)
const book = createBook("The Hobbit", "Tolkien", "1937", true);
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function addBookToLibrary (title, author, year, isRead) {
//     const book = new Book(title, author, year, isRead);
//     myLibrary.push(book);
// }

// OLD: function addBookToLibrary (title, author, year, isRead) { ... }

// NEW: We destructure the object immediately in the parameters!
function addBookToLibrary({ title, author, year, isRead }) { 
    // The function logic stays EXACTLY the same!
    // JavaScript has already unpacked 'title', 'author', etc. for us.
    const book = new Book(title, author, year, isRead);
    myLibrary.push(book);
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
function displayBook(library) {
    container.innerHTML = ''; // Clear the current display

    library.forEach((book) => {
        // 1. Create the card using our new helper
        const card = createBookCard(book);
        
        // 2. Add it to the DOM
        container.appendChild(card);
    });
}

// Destructure the book properties directly in the parameters!
function createBookCard({ title, author, year, isRead, id }) {
    const card = document.createElement('div');
    card.classList.add('card-container');

    // Helper to reduce repetitive "createElement" lines
    const createInfo = (text) => {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    };

    // Use Template Literals for cleaner strings
    card.appendChild(createInfo(`Title: ${title}`));
    card.appendChild(createInfo(`Author: ${author}`));
    card.appendChild(createInfo(`Year: ${year}`));
    card.appendChild(createInfo(`Have Read?: ${isRead ? 'Yes' : 'No'}`));

    // --- BUTTONS (Logic stays the same, just organized) ---
    
    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('removeButton');
    removeBtn.dataset.bookId = id; // Use the destructured 'id'
    removeBtn.addEventListener('click', handleRemove); // Delegate to a named function
    card.appendChild(removeBtn);

    // Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.classList.add('toggleButton');
    toggleBtn.dataset.bookId = id;
    toggleBtn.addEventListener('click', handleToggle); // Delegate to a named function
    card.appendChild(toggleBtn);

    return card;
}

function handleRemove(e) {
    e.target.closest('.card-container').remove();
    const idToDelete = e.target.dataset.bookId;
    // Filter the global library
    myLibrary = myLibrary.filter(book => book.id !== idToDelete);
}

function handleToggle(e) {
    const idToToggle = e.target.dataset.bookId;
    const foundBook = myLibrary.find(book => book.id === idToToggle);
    foundBook.toggleReadStatus();
    displayBook(myLibrary); // Re-render to update the "Yes/No" text
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function insertBook (event) {
//     event.preventDefault();
//     const bookTitle = title.value;
//     const bookAuthor = author.value;
//     const bookYear = year.value;
//     let haveRead = dialog.querySelector('input[name="isRead"]:checked').value;
//     haveRead === 'Yes' ? haveRead = true : haveRead = false;
//     addBookToLibrary(bookTitle, bookAuthor, bookYear, haveRead);
//     displayBook(myLibrary);
//     dialog.close();
// }

function insertBook(event) { // SENDER (pack into single object)
    event.preventDefault();

    // 1. Pack all values into one object immediately
    // Note: We use the keys 'title', 'author', 'year' to match our expectation
    const bookData = {
        title: title.value,
        author: author.value,
        year: year.value,
        // concise ternary operator for read status
        isRead: dialog.querySelector('input[name="isRead"]:checked').value === 'Yes' 
    };

    // 2. Pass the SINGLE object
    addBookToLibrary(bookData);

    displayBook(myLibrary);
    dialog.close();
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// --- 3. ADD EVENT LISTENERS ---
showDialog.addEventListener('click', () => {
    dialog.showModal();
})

form.addEventListener('submit', insertBook);
cancelBtn.addEventListener('click', () => {
    dialog.close();
})