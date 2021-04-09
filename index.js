 let now = new Date();

 let hour = now.getHours();
 if (hour < 10) {
   hour = `0${hour}`;
 }
 let minutes = now.getMinutes();
 if (minutes < 10) {
   minutes = `0${minutes}`;
 }
 let days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
 ];
 let day = days[now.getDay()];
 let currentDateTime = `${day} ${hour}:${minutes}`;

 console.log(currentDateTime);

 let currentDayAndTime = document.querySelector("#current-date");
 currentDayAndTime.innerHTML = currentDateTime;

 function citySearch(event) {
   event.preventDefault();
   let cityInput = document.querySelector("#city-search").value;
   let myCity = cityInput;
   let units = "metric";
   let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
   let apiUrl = `https://
api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=${units}`;

   axios.get(apiUrl).then(showTemp);
 }

 let city = document.querySelector("form");
 city.addEventListener("submit", citySearch);

 function showTemp(response) {
   console.log(response);

   document.querySelector("#temp-display").innerHTML = Math.round(
     response.data.main.temp
   );
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector(
     "#humidity"
   ).innerHTML = `${response.data.main.humidity}%`;
   let windElement = Math.round(response.data.wind.speed);
   document.querySelector("#wind").innerHTML = `${windElement} km/hr`;
   document.querySelector(
     "#pressure"
   ).innerHTML = `${response.data.main.pressure} mb`;
   let lowTemp = Math.round(response.data.main.temp_min);
   document.querySelector("#low").innerHTML = `${lowTemp}°`;
   let highTemp = Math.round(response.data.main.temp_max);
   document.querySelector("#high").innerHTML = `${highTemp}°`;
 }

 function convertFahrenheit(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp-display");
   let temperature = temperatureElement.innerHTML;
   temperature = Number(temperature);
   temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
 }

 let fahrenheitConversion = document.querySelector("#fahrenheit");
 fahrenheitConversion.addEventListener("click", convertFahrenheit);

 function convertCelsius(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp-display");
   temperatureElement.innerHTML = 20;
 }

 let celsiusConversion = document.querySelector("#celsius");
 celsiusConversion.addEventListener("click", convertCelsius);

 function getPosition(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchPosition);
 }

 function searchPosition(position) {
   let unit = "metric";
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;

   let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
   axios.get(apiUrl).then(showTemp);
 }

 let currentButton = document.querySelector("#current-button");
 currentButton.addEventListener("click", getPosition);
 

