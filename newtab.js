const clock = document.getElementById('clock')
const backgroundImg = document.getElementById('background-img')
const searchButton = document.getElementById('search-i')
const searchInput = document.getElementById('search-input')

const backgroundImageCount = 7;

function setImgSrc() {
  let randomNumber = Math.floor(Math.random() * backgroundImageCount);
  backgroundImg.src = `background/default-${randomNumber}.png `
}

setImgSrc();

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
  if (searchInput.value === '') return;
  window.open("https://www.bing.com/search?q=" + searchInput.value, "_self");
}

function main() {
  searchInput.onfocus = searchFocus;
  searchInput.onblur = searchFocus;
  searchButton.onclick = search;
  document.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) search();
  });
  setInterval(updateClock, 1000);
  updateClock();
}

window.onload = main;
