// console.log('Client side javascript file loaded');
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

document.addEventListener("click", function () {
  document.getElementById("demo").innerHTML = "Help unavailable";
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  console.log(location);

  console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const unitsIn = "units=m"; //by default is m check the weatherstack documentation for info f=fahrenheit, m=metric celsius
  const access_key = "47b0ec59a41936fddce4544b239349ab";
  // const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}&${unitsIn}`;
  // const url =  "http://api.weatherstack.com/current?access_key=" +    access_key +    "&query=" +    location;
  const url = "/current?access_key=" + access_key + "&query=" + location;

  fetch(url).then((response) => {
    console.log("test");
    // messageTwo.textContent = response.json()
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent =
          location + ": Unable to find location. Try another search e.g Malmo ";
      } else {
        messageOne.textContent = `Temperatrue: ${data.current.temperature} => Wind speed: ${data.current.wind_speed} => Humidity: ${data.current.humidity} => Feels like: ${data.current.feelslike} => cloud cover: ${data.current.cloudcover} => wind speed : ${data.current.wind_speed} => latitude: ${data.location.lat} => longtitude: ${data.location.lon} `;
      }
    });
  });
});
