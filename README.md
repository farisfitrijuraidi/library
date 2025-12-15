# Library Project

This is a dynamic web application built to track a personal library of books. This project was created as part of The Odin Project's JavaScript curriculum. The primary goal was to practice using Object Constructors, Prototypal Inheritance, and managing application state using plain JavaScript.

---

## Features
* **Dynamic Content Generation**: Book cards are generated dynamically via JavaScript based on an array of objects, rather than being hard-coded in HTML.
* **Modal Form Interface**: Utilizes the native HTML `<dialog>` element and `.showModal()` API to provide a clean, built-in popup form for adding new books.
* **Interactive State Management**: Users can remove books or toggle their "Read" status in real-time. The application state is synced between the data model (JavaScript array) and the visual interface (DOM).
* **Responsive Grid Layout**: The book cards are organized using CSS Grid with `repeat(auto-fit, value)`, ensuring the layout looks good on both desktop and mobile screens without complex media queries.
* **Form Validation**: Implements native browser validation (required fields, type checking) to ensure no empty or invalid book entries are added.

---

## What I Learned
This project challenged me to step away from simple DOM manipulation and think about "State-Driven UI."

Key takeaways include:
* **Object Constructors & Prototypes**: I learned how to define a `Book` object blueprint and attach methods (like `toggleReadStatus`) to the `Book.prototype` to save memory and keep logic centralized.
* **Separation of Concerns**: I practiced keeping the "Data" (the `myLibrary` array) separate from the "Display" (the DOM). The DOM is treated as a reflection of the array, rather than the source of truth.
* **The Dialog API**: Instead of building a custom modal with complex CSS `z-index` stacks, I used the modern `<dialog>` element for better accessibility and built-in backdrop support.
* **Event Handling**: I gained a deeper understanding of `e.preventDefault()` to handle form submissions without reloading the page, and `e.target` delegation to handle clicks on dynamically created buttons.
* **CSS Specificity**: I encountered and solved specificity issues where generic rules (like `.card-container button`) were overriding specific utility classes, teaching me the importance of specific selectors.

---

## Acknowledgements
* This project is based on the [Library assignment](https://www.theodinproject.com/lessons/node-path-javascript-library) from The Odin Project.
* Fonts used: 'Roboto' via Google Fonts (hosted locally).