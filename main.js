const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#book-modal');
const bookForm = document.getElementById('book-form');
const addBookButton = document.querySelector('#add-button');
const bookGrid = document.getElementById('book-grid');
const bookCardBlueprint = document.querySelector('.book-card.hidden')

addBookButton.onclick = () => {
    showModal();
};

overlay.addEventListener('click', () => {
    hideModal();
})

function showModal() {
    if (!overlay.classList.contains('active')) {
        overlay.classList.add('active');
        modal.classList.add('active');
    }
};

function hideModal() {
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
    }
};

bookForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
    event.preventDefault();
    const bookData = new FormData(event.target);
    let currentBook = new Book(bookData.get('title'), bookData.get('author'), bookData.get('pages'), bookData.get('read'));
    (currentBook.read == null) ? currentBook.read = false : currentBook.read = true;
    addBookToLibrary(currentBook);
    hideModal();

};


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(currentBook) {
    bookCard(currentBook);
    myLibrary.push(currentBook);
    currentBook.bookIndex = myLibrary.length - 1; 
    console.table(myLibrary);
}

function bookCard(bookObject) {
    const currentCard = bookCardBlueprint.cloneNode(true);
    bookGrid.appendChild(currentCard);
    currentCard.classList.remove('hidden');

    const textWrapper = currentCard.querySelector('.book-text');
    textWrapper.querySelector('.title').textContent = bookObject.title;
    textWrapper.querySelector('.author').textContent = bookObject.author;
    textWrapper.querySelector('.pages').textContent = bookObject.pages;
    const readbtn = currentCard.querySelector('.button-wrapper').querySelector('.read-btn');
    const removebtn = currentCard.querySelector('.button-wrapper').querySelector('.remove-btn');

    if (bookObject.read == true) {
        readbtn.classList.add('true');
        readbtn.textContent = 'Read';
    }

    readButtonTrigger(readbtn, bookObject);
    removebtn.onclick = () => currentCard.remove();

};

function readButtonTrigger(readbtn, bookObject) {
    readbtn.onclick = function() {
        if (bookObject.read == true) {
            readbtn.classList.remove('true');
            readbtn.textContent = 'Not Read';
            bookObject.read = false;
        }
        else {
            readbtn.classList.add('true');
            readbtn.textContent = 'Read';
            bookObject.read = true;
        };
    };
};
