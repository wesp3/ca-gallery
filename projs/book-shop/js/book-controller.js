"use strict";

function onInit() {
  renderTable();
  renderBooks();
}

function renderBooks() {
  var books = getBooks();
  var strHtmls = books.map((book) => {
    return `
        <tr>
        <td>${book.id}</td>
        <td><img src="img/${book.img}.jpg">
        <td>${book.title} </td>
        <td>${book.price}</td>
        <td>${book.rate}</td>

        <td>
            <span class="action_btn">
                <button title="Read" onclick="onReadBook('${book.id}')">Read</button>
                <button title="Update" onclick="onUpdateBook('${book.id}')">Update</button>
                <button title="Remove" onclick="onRemoveBook('${book.id}')">Remove</button>
        </span>
            </td>
        </tr>
    `;
  });
  document.querySelector("tbody").innerHTML = strHtmls.join("");
}

function renderTable() {
  document.querySelector("table").hidden = false;
}

function onAddBook() {
  var title = document.querySelector(".book-title").value;
  var price = document.querySelector(".book-price").value;
  if (!title) return;
  addBook(title, price); //TODO: change the price to numeric variable
  renderBooks();
  var elBtnAdd = document.querySelector(".add-book");
  //elBtnAdd.style.visibility = 'hidden'
}

function addBookBtn() {
  var elBtnAdd = document.querySelector(".add-book");
  elBtnAdd.style.visibility = "visible";
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function onUpdateBook(bookId) {
  var newPrice = +prompt("Enter a new price");
  if (!newPrice) return;
  updateBook(bookId, newPrice);
  renderBooks();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector(".modal");
  elModal.querySelector("h3").innerText = book.title;
  elModal.querySelector(".modal-price").innerText = book.price;
  elModal.querySelector("img").src = "img/" + book.img + ".jpg";
  elModal.querySelector("p").innerText = book.desc;
  // elModal.style.display = "block";
  elModal.classList.add("modal-show");
  elModal.querySelector(".decrement").setAttribute("onclick", `onChangeRate("${bookId}", -1)`)
  elModal.querySelector(".increment").setAttribute("onclick", `onChangeRate("${bookId}", +1)`)
  elModal.querySelector("#output-area").innerText = getBookRating(bookId)
  // elModal.hidden = false
}

function onChangeRate(bookId, dif) {
 var elRating = document.querySelector("#output-area")
  changeRate(bookId, dif);
  elRating.innerText = getBookRating(bookId)
  renderBooks()
}

function onCloseModal() {
  var elModal = document.querySelector(".modal");
  // elModal.style.display = "none";
  elModal.classList.remove("modal-show");
  // document.querySelector('.modal').hidden = true
}
