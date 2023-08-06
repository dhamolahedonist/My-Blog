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
  const likeBtn = document.querySelectorAll(".like-btn");

  allButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("ok");
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
  likeBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const postId = btn.dataset.postId;
      try {
        // Send a POST request to the server to increment like_count
        const response = await fetch(`/like/${postId}`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          // Update the like_count value in the EJS template
          const likeCountSpan = btn.querySelector("span");
          likeCountSpan.textContent = data.like_count;
          // Add or remove the 'red' class based on the updated like_count
          if (data.like_count > 0) {
            btn.classList.add("red");
          } else {
            btn.classList.remove("red");
          }
        } else {
          console.log("Failed to like the post");
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
});
