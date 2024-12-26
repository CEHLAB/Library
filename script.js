const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function() {
    this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    displayBooks();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;

        const bookReadStatus = document.createElement('p');
        bookReadStatus.textContent = book.hasRead ? "Status: Already read" : "Status: Not read yet";

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
        });

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookReadStatus);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('form-container').classList.toggle('hidden');
});

document.getElementById('new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('hasRead').checked;
    addBookToLibrary(title, author, pages, hasRead);
    document.getElementById('new-book-form').reset();
    document.getElementById('form-container').classList.add('hidden');
});

// Manually add a few books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

// Call the displayBooks function to show the books on the page
displayBooks();