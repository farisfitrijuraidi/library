// --- 1. SELECT DOM ELEMENTS ---
const container = document.querySelector(".container");
const dialog = document.getElementById("dialog");
const form = dialog.querySelector("form");
const showDialog = document.getElementById("showDialog");
const confirmBtn = dialog.querySelector("#confirmBtn");
const cancelBtn = dialog.querySelector("#cancelBtn");
const title = dialog.querySelector("#title");
const author = dialog.querySelector("#author");
const year = dialog.querySelector("#year");
const titleError = dialog.querySelector("#title + span.error");
const authorError = dialog.querySelector("#author + span.error");
const yearError = dialog.querySelector("#year + span.error");

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
    container.innerHTML = "";
    array.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card-container");
      container.appendChild(card);

      const createInfo = (text) => {
        const p = document.createElement("p");
        p.textContent = text;
        return p;
      };

      // Use Template Literals for cleaner strings
      card.appendChild(createInfo(`Title: ${element.title}`));
      card.appendChild(createInfo(`Author: ${element.author}`));
      card.appendChild(createInfo(`Year: ${element.year}`));
      card.appendChild(
        createInfo(`Have Read?: ${element.isRead ? "Yes" : "No"}`),
      );

      // --- BUTTONS (Logic stays the same, just organized) ---

      // Remove Button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("removeButton");
      removeBtn.dataset.bookId = element.id; // Use the destructured 'id'
      removeBtn.addEventListener("click", this.handleRemove); // Delegate to a named function
      card.appendChild(removeBtn);

      // Toggle Button
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "Toggle Read";
      toggleBtn.classList.add("toggleButton");
      toggleBtn.dataset.bookId = element.id;
      toggleBtn.addEventListener("click", this.handleToggle); // Delegate to a named function
      card.appendChild(toggleBtn);
    });
  }
  insertBook = (event) => {
    if (!title.validity.valid) {
      this.showError(title, titleError);
    }
    if (!author.validity.valid) {
      this.showError(author, authorError);
    }
    if (!year.validity.valid) {
      this.showError(year, yearError);
    }
    if (
      !title.validity.valid ||
      !author.validity.valid ||
      !year.validity.valid
    ) {
      event.preventDefault();
    } else {
      event.preventDefault();
      const bookTitle = title.value;
      const bookAuthor = author.value;
      const bookYear = year.value;
      let haveRead = dialog.querySelector('input[name="isRead"]:checked').value;
      haveRead === "Yes" ? (haveRead = true) : (haveRead = false);
      this.addBookToLibrary(bookTitle, bookAuthor, bookYear, haveRead);
      this.createBookCard(this.myLibrary);
      form.reset();
      dialog.close();
    }
  };

  handleRemove = (e) => {
    e.target.closest(".card-container").remove();
    const idToDelete = e.target.dataset.bookId;
    // Filter the global library
    this.myLibrary = this.myLibrary.filter((book) => book.id !== idToDelete);
  };

  handleToggle = (e) => {
    const idToToggle = e.target.dataset.bookId;
    const foundBook = this.myLibrary.find((book) => book.id === idToToggle);
    foundBook.toggleReadStatus();
    this.createBookCard(this.myLibrary); // Re-render to update the "Yes/No" text
  };

  showError = (targetField, targetSpan) => {
    if (targetField.validity.valueMissing) {
      if (targetField.id === "title") {
        targetSpan.textContent = "You need to enter a title.";
      } else if (targetField.id === "author") {
        targetSpan.textContent = "You need to enter the name of the author.";
      } else if (targetField.id === "year") {
        targetSpan.textContent = "Please enter the published year.";
      }
    } else {
      if (targetField.id === "year") {
        if (targetField.validity.rangeUnderflow) {
          targetSpan.textContent = "Year must be 1900 and above.";
        } else if (targetField.validity.rangeOverflow) {
          targetSpan.textContent = "Year must be 2026 and below.";
        }
      }
    }
    targetSpan.className = "error active";
  };
}

const theLibrary = new Library();

// --- 3. ADD EVENT LISTENERS ---
showDialog.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", theLibrary.insertBook);
cancelBtn.addEventListener("click", () => {
  dialog.close();
});

title.addEventListener("input", () => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    theLibrary.showError(title, titleError);
  }
});

author.addEventListener("input", () => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    theLibrary.showError(author, authorError);
  }
});

year.addEventListener("input", () => {
  if (year.validity.valid) {
    yearError.textContent = "";
    yearError.className = "error";
  } else {
    theLibrary.showError(year, yearError);
  }
});
