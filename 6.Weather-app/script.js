//Variables
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

//async func
async function checkWeather(city) {
  const api_key = "db9bd0e93c77e1d1a771c1062c4be014";

  //syntax: ${} to insert a variable in a back tick string
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  //fetch function takes url and gives a response in json
  //await: to store to data at a time
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  // check for wrong location input
  //cod= status code
  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("wrong name");
    return;
  }
  //in case no error
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";


  //show the fetched data in html -273 for kelvin to celsius
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

  //description text , clouds ,sunny etc
  description.innerHTML = `${weather_data.weather[0].description}`;

  //other data
  humidity.innerHTML = `${weather_data.main.humidity}%`;

  wind_speed.innerHTML = `${weather_data.wind.speed}KM/H`;

  //to show image
  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/6.Weather-app/assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/6.Weather-app/assets/clear.png";
      break;
    case "Rain":
      weather_img.src = "/6.Weather-app/assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "/6.Weather-app/assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "/6.Weather-app/assets/snow.png";
      break;
  }
  console.log(weather_data);
}

//event to call the check weather function
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
