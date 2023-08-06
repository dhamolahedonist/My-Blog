const elements = {
  1: document.getElementById(`image-1`),
  2: document.getElementById(`image-2`),
  3: document.getElementById(`image-3`),
  4: document.getElementById(`image-4`),
};

const numElements = Object.keys(elements).length;
let i = 1;
elements[i].style.display = "block";

setInterval(() => {
  if (i > numElements) {
    i = 1;
  }
  hideAll();
  elements[i].style.display = "block";
  i++;
}, 1000 * 2);

function hideAll() {
  Object.keys(elements).forEach((key) => {
    elements[key].style.display = "none";
  });
}

// searchBar
document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  allButtons.forEach((button) => {
    button.addEventListener("click", () => {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      event.target.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  });

  searchClose.addEventListener("click", function () {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
    event.target.setAttribute("aria-expanded", "false");
  });
});
