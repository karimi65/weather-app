const api = {
  key: "41e538b1f7797f8925dd7c6cbb200f24",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}
