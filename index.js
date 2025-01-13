const buttonsDiv = document.getElementById("buttons");
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nxtBtn");
const content = document.getElementById("content");
const buttonsPerPage = 4;
let currentStart = 1; //for buttons
let data = [];
const itemsPerPage = 10;
let totalPages = 0;
let page = 1;

async function fetchData() {
  if (data.length == 0) {
    const response = await fetch("data.json");
    data = await response.json();
    totalPages = Math.ceil(data.length / itemsPerPage);
  }
  renderButtons();
  renderContent(1);
}

next.addEventListener("click", () => {
  if (
    page == Number(buttonsDiv.lastElementChild.textContent) &&
    currentStart + buttonsPerPage <= totalPages
  ) {
    currentStart++;
    renderButtons();
  }
  if (page < totalPages) {
    renderContent(++page);
    renderButtons();
  }
});

prev.addEventListener("click", () => {
  if (
    page == Number(buttonsDiv.firstElementChild.textContent) &&
    currentStart > 1
  ) {
    currentStart--;
    renderButtons();
  }
  if (page > 1) {
    renderContent(--page);
    renderButtons();
  }
});

function renderContent(page) {
  content.innerHTML = "";
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  for (let i = start; i < end; i++) {
    const li = document.createElement("div");
    if (data[i]) {
      li.textContent = i + 1 + "  " + data[i].title;
    }
    li.className =
      "bg-white border border-indigo-600 text-gray-800 p-4 rounded-2xl mb-2 shadow";
    content.appendChild(li);
  }
}

function renderButtons() {
  buttonsDiv.innerHTML = "";
  for (let i = currentStart; i < currentStart + buttonsPerPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "bg-white text-indigo-600 px-4 py-2 rounded-full";
    if (i === page) {
      button.classList.add("bg-indigo-600", "text-white"); // Active button style
    }
    button.addEventListener("click", () => {
      page = i;
      renderContent(page);
      renderButtons();
    });
    buttonsDiv.appendChild(button);
  }
}

fetchData();
