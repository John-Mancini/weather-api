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
