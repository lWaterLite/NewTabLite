const clock = document.getElementById('clock')
const backgroundImg = document.getElementById('background-img')
const searchButton = document.getElementById('search-i')
const searchInput = document.getElementById('search-input')
const searchSuggestions = document.getElementById('search-suggestions')
const searchContainer = document.getElementById('search-container')

let inputTimer;

const backgroundImageCount = 7;

function getSuggestions(json) {
  let suggestions = [];
  for (const result of json['AS']['Results']) {
    for (const suggest of result['Suggests']) {
      suggestions.push(suggest['Txt'])
    }
  }

  for (const suggestion of suggestions) {
    let newSuggestion = document.createElement('div')
    newSuggestion.textContent = suggestion;
    newSuggestion.onclick = () => {
      console.log(suggestion);
      search(suggestion)
    };
    searchSuggestions.appendChild(newSuggestion);
  }
  searchSuggestions.style.display = 'block';
  searchSuggestions.style.opacity = '1'
}

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

function searchOnFocus() {
  backgroundImg.classList.add('background-img-focus')
}

function searchFocusout(e) {
  if (searchContainer.contains(e.target) || searchSuggestions.contains(e.target)) return;
  backgroundImg.classList.remove('background-img-focus');
  clearTimeout(inputTimer);
  searchInput.value = "";
  handleEmptySearchString();
}

function search(value) {
  window.open("https://www.bing.com/search?q=" + value, "_self");
}

function searchOnClick() {
  if (searchInput.value === '') return;
  search(searchInput.value);
}

function handleEmptySearchString() {
  if (searchInput.value !== "") return true;
  searchSuggestions.innerHTML = '';
  searchSuggestions.style.opacity = '0'
  return false;
}

async function createSuggestionsInnerHtml(suggestions) {
  searchSuggestions.innerHTML = '';
  searchSuggestions.style.opacity = '0'

  let url = `https://api.bing.com/qsonhs.aspx?type=cb&q=${searchInput.value}&cb=getSuggestions`
  let script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.remove();
}

async function searchOninput() {
  clearTimeout(inputTimer);
  inputTimer = setInterval(() => {
    clearTimeout(inputTimer);
    if (handleEmptySearchString() === false) return;
    createSuggestionsInnerHtml();
  }, 500);
}

function main() {
  searchInput.onfocus = searchOnFocus;
  document.addEventListener('click', (e) => searchFocusout(e));
  searchButton.onclick = searchOnClick;
  searchInput.oninput = searchOninput;
  document.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) searchOnClick();
  });
  setInterval(updateClock, 1000);
  updateClock();
}

window.onload = main;
