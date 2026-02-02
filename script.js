const table = document.querySelector(".table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const Library = JSON.parse(localStorage.getItem("book")) || [];

//function for issue book
const issueBook = (index) => {
  if (Library.length === 0) {
    return;
  }
  const issuedBook = Library[index];
  if (issuedBook.quantity !== 0) {
    issuedBook.quantity--;
    setLocalStorage(Library);
    displayTable(Library);
  } else {
    alert("all book issued");
  }
};
//function for return book
const returnBook = (index) => {
  if (Library.length === 0) {
    return;
  }
  const returnBook = Library[index];
  if (returnBook.quantity < returnBook.issuedQuantity) {
    returnBook.quantity++;
    setLocalStorage(Library);
    displayTable(Library);
  } else {
    alert("all books returned");
  }
};

//function for display Table
const displayTable = (items) => {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  if (items.length === 0) {
    return;
  }

  //displaying table head
  const tableHeadrow = document.createElement("tr");
  Object.keys(items[0]).forEach((element) => {
    if (element !== "issuedQuantity") {
      const th = document.createElement("th");
      th.textContent = element;
      tableHeadrow.appendChild(th);
    }
  });

  //displyind action in table head
  const th = document.createElement("th");
  th.colSpan = 2;
  th.textContent = "Actions";
  tableHeadrow.appendChild(th);
  thead.appendChild(tableHeadrow);

  //displaying values
  items.forEach((item, index) => {
    const tablerows = document.createElement("tr");
    Object.entries(item).forEach(([key, value]) => {
      if (key === "issuedQuantity") {
        return;
      }
      const td = document.createElement("td");
      td.textContent = value;
      tablerows.appendChild(td);
    });

    //Buttons for action
    const tdForButtons = document.createElement("td");
    const issueButton = document.createElement("a");
    issueButton.textContent = `Issue Book`;
    const returnButton = document.createElement("a");
    returnButton.textContent = `return Book`;

    //function call for issueBook
    issueButton.addEventListener("click", () => {
      issueBook(index);
    });

    //function call for return book
    returnButton.addEventListener("click", () => {
      returnBook(index);
    });

    tdForButtons.append(issueButton, returnButton);
    tablerows.appendChild(tdForButtons);
    tbody.appendChild(tablerows);
  });
};

//function for localstorage setup
const setLocalStorage = (item) => {
  if (item.length === 0) {
    return;
  }
  localStorage.setItem("book", JSON.stringify(item));
};

//function for formValidation
const isValid = () => {
  let input1 = form.children[0].value;
  let input2 = form.children[1].value;
  let input3 = form.children[2].value;
  return input1 && input2 && input3 ? true : false;
};

//function for extract data
const extractFormData = (e) => {
  e.preventDefault();

  if (isValid()) {
    const formDetails = new FormData(e.target);
    const formEntries = Object.fromEntries(formDetails);
    formEntries.quantity = Number(formEntries.quantity);
    formEntries.issuedQuantity = Number(formEntries.quantity);
    Library.push(formEntries);
    setLocalStorage(Library);
    displayTable(Library);
    form.reset();
  } else {
    alert("all input must be filled ");
  }
};

form.addEventListener("submit", extractFormData);

displayTable(Library);
