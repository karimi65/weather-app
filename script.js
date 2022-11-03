// Add an API key and url
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

    // console.log(searchbox.value);
  }
}

// Fetch request
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// Display search result on the screen
function displayResults(weather) {
  console.log(weather);
  // Display city and country
  let city = document.querySelector(".location .city");
  if (!weather.name) {
    alert("City Not Found! Please enter a valid city name.");
  }
  city.innerHTML = `<i class="bx bx-map"></i> ${weather.name}, ${weather.sys.country}`;

  // Display date
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  // Display temperature
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  // Display weather description
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = `${weather.weather[0].description}`;

  // Display weather images
  let icons = weather.weather[0].icon;
  let weather_icon = document.querySelector(".current img");

  weather_icon.src = "http://openweathermap.org/img/wn/" + icons + "@2x.png";
  weather_icon.alt = "weather icon";

  // Display feels like
  let feel = document.querySelector(".current .feel");
  feel.innerHTML = `<i class="bx bxs-thermometer"></i> Feels like: ${Math.round(
    weather.main.feels_like
  )}<span>°c</span>`;

  // Display high and low temperature
  let hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `<i class="bx bxs-down-arrow-alt"></i> L: ${Math.round(
    weather.main.temp_min
  )}°c  /  H: ${Math.round(
    weather.main.temp_max
  )}°c <i class="bx bxs-up-arrow-alt"></i>`;

  // Display humidity
  let humidity = document.querySelector(".current .humi");
  humidity.innerHTML = `<i class="bx bxs-droplet-half"></i> Humidity: ${weather.main.humidity}%`;

  // Display wind speed
  let wind = document.querySelector(".current .wind");
  wind.innerHTML = `<i class="bx bx-wind"></i> Wind: ${Math.round(
    weather.wind.speed
  )} km/h`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// Get the data of device/current location
document.querySelector(".button").addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(succes, err);

  function succes(position) {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
    )
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  }

  function err() {
    location.innerText = "Unable to retrieve your location!";
  }
});
