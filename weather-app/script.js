const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const displayWeather = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");
const closePopup = document.querySelector('#close-popup')


const apiKey = "d392d0e8411554cb3e894189e9acf9e5";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(cityName) {
  errorMsg.classList.remove("popup-error");
  
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorMsg.classList.add("popup-error");
    // setTimeout(() => {
    //   errorMsg.classList.remove("popup-error");
    // }, 3000);
    return;
  }
  var data = await response.json();
  city.textContent = data.name;
  temp.textContent = Math.round(data.main.temp) + "°C";
  humidity.textContent = data.main.humidity + "%";
  wind.textContent = data.wind.speed + " km/h";

  const weatherCondition = data.weather[0].main;
  if (weatherCondition === "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (weatherCondition === "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (weatherCondition === "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (weatherCondition === "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (weatherCondition === "Rain") {
    weatherIcon.src = "images/rain.png";
  } else weatherIcon.src = "images/snow.png";

  displayWeather.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() === "") {
    alert("Search box is empty!");
    return;
  }
  checkWeather(searchBox.value.trim());
  searchBox.value = "";
});

searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (searchBox.value.trim() === "") {
      alert("Search box is empty!");
      return;
    }
    checkWeather(searchBox.value.trim());
    searchBox.value = "";
  }
});

closePopup.addEventListener('click',()=>{
  errorMsg.classList.remove("popup-error")

})
