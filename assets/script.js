var API_KEY = "32bd1aba40b578b2069db9c3cbbf0792";
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=32bd1aba40b578b2069db9c3cbbf0792+
let citySearch = $("#search-city");
let citySearchBtn = $("#search-city-button");
let temperature = $("#current-temp");
let windSpeed = $("#current-wind-speed");
let humidity = $("#current-humidity");
let uvIndex = $("#uv-index");
let cityName = $("#cityName");
let weatherContent = $("#weather-content");
let searchHistoryList = $("#search-history-list");
let clearHistoryBtn = $("#clear-history");
let fiveDayPanel = $("#five-day-forecast");

let cityNames = [];

loadCities();
displayCityBtn();

citySearchBtn.click(function () {
  let city = citySearch.val();
  appendNewBtn(city);
  getAllWeatherData(city);
  saveCities();
});

function getUV(lat, lon) {
  let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  $.ajax({
    url: uvUrl,
  }).done(function (data) {
    // console.log(data);
    uvIndex.text(data.value);
    // return data.value;
  });
}

function appendNewBtn(city) {
  if (!cityNames.includes(city)) {
    appendBtn(city);
    cityNames.push(city);
  }
}

function appendBtn(city) {
  let li = $("<li>");
  li.text(city);
  li.addClass("list-group-item"); //<li class = "listgroupitem">"</li>"
  li.click(function (event) {
    let city = $(event.target).text();
    console.log(city);
    getAllWeatherData(city);
  });
  $("#search-history-list").append(li);
}

function getAllWeatherData(city) {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=32bd1aba40b578b2069db9c3cbbf0792&units=imperial";

  fetch(url, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.name);
      // console.log(data.main.temp);
      // console.log(data.main.humidity);
      // console.log(data.wind.speed);
      // console.log();

      temperature.text(data.main.temp);
      windSpeed.text(data.wind.speed);
      humidity.text(data.main.humidity);
      getUV(data.coord.lat, data.coord.lon);
      // uvIndex.text(getUV(data.coord.lat, data.coord.lon));
      cityName.text(data.name);
      weatherContent.removeClass("hide");
    });

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=32bd1aba40b578b2069db9c3cbbf0792&units=imperial";
  console.log(urlForecast);

  $.ajax({
    url: urlForecast,
  }).done(function (data) {
    console.log("forecast");
    console.log(data);
    populateForecastPanels(data);
  });
}

function clearHistory() {
  searchHistoryList.empty();
  cityNames.length = 0;
  saveCities();
}
clearHistoryBtn.click(clearHistory);

function populateForecastPanels(data) {
  let fiveDays = [];
  for (let i = 0; i < data.list.length; i++) {
    // console.log(i);
    // console.log(data.list[i]);
    // console.log(data.list[i].dt_txt);
    let weatherSnapshot = data.list[i];
    if (data.list[i].dt_txt.includes("12:00:00")) {
      fiveDays.push(weatherSnapshot);
    } else {
    }
  }
  // console.log(fiveDays);
  fiveDayPanel.empty();
  for (let i = 0; i < fiveDays.length; i++) {
    // console.log(fiveDays[i]);
    let day = fiveDays[i];
    let panel = generatePanel(day);
    fiveDayPanel.append(panel);
  }
}

function generatePanel(day) {
  console.log(day);
  return `<div class="col-2">
     <div class="card">
      <div class="card-body">
        <h5 class="card-title">${day.dt_txt}</h5>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"/>
        <p class="card-text">Temp:${day.main.temp}</p>
        <p class="card-text">Humidity:${day.main.humidity}</p>
      </div>
    </div>
  </div>`;
}

// var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));
function saveCities() {
  localStorage.setItem("cityNames", JSON.stringify(cityNames));
}

function loadCities() {
  var cityString = localStorage.getItem("cityNames");
  if (cityString) {
    cityNames = JSON.parse(cityString);
  }
}

function displayCityBtn() {
  for (let index = 0; index < cityNames.length; index++) {
    var item = cityNames[index];
    console.log(item);
    appendBtn(item);
  }
}
