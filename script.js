// Add an API key
const api = {
  key: "41e538b1f7797f8925dd7c6cbb200f24",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Setup an event listener on the search box
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

// fetch request
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
}
