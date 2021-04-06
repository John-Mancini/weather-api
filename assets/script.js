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

citySearchBtn.click(function () {
  let city = citySearch.val();
  appendBtn(city);
  getAllWeatherData(city);
});

function appendBtn(city) {
  if (!cityNames.includes(city)) {
    let li = $("<li>");
    li.text(city);
    li.addClass("list-group-item"); //<li class = "listgroupitem">"</li>"
    li.click(function (event) {
      let city = $(event.target).text();
      console.log(city);
      getAllWeatherData(city);
    });
    $("#search-history-list").append(li);
    cityNames.push(city);
  }
}
function getAllWeatherData(city) {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
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
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
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
