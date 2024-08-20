const clock = document.getElementById('clock')
const backgroundImg = document.getElementById('background-img')
const searchButton = document.getElementById('search-i')
const searchInput = document.getElementById('search-input')

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;
}

function searchFocus() {
  backgroundImg.classList.toggle('background-img-focus')
}

function search() {
  window.open("https://www.bing.com/search?q=" + searchInput.value, "_self");
}

function main() {
  searchInput.onfocus = searchFocus;
  searchInput.onblur = searchFocus;
  setInterval(updateClock, 1000);
  updateClock();
  searchButton.onclick = search;
}

window.onload = main;
