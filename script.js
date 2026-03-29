const apiKey = "ce99fe14e9614d16bf234347262903";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city);

        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherDiv.style.display = "none";
        } else if (response.ok) {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.location.name;
            document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
            document.querySelector(".humidity").innerHTML = "Humidity: " + data.current.humidity + "%";
            document.querySelector(".wind").innerHTML = "Wind: " + Math.round(data.current.wind_kph) + " km/h";

            weatherDiv.style.display = "block";
            errorMsg.style.display = "none";
            searchBox.value = "";
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        errorMsg.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim()) {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchBox.value.trim()) {
        checkWeather(searchBox.value);
    }
});