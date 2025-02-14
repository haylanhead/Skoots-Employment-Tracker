let is24HourFormat = false;
let isMetric = false;

// Weather emojis based on weather codes
const weatherEmojis = {
  1000: "☀️", // Sunny / Clear
  1003: "🌤️", // Partly cloudy
  1006: "☁️", // Cloudy
  1009: "☁️", // Overcast
  1030: "🌫️", // Mist
  1063: "🌦️", // Patchy rain possible
  1066: "🌨️", // Patchy snow possible
  1069: "🌨️", // Patchy sleet possible
  1072: "❄️", // Patchy freezing drizzle possible
  1087: "⛈️", // Thundery outbreaks possible
  1114: "❄️", // Blowing snow
  1117: "❄️", // Blizzard
  1135: "🌫️", // Fog
  1147: "🌫️", // Freezing fog
  1150: "🌧️", // Patchy light drizzle
  1153: "🌧️", // Light drizzle
  1168: "❄️", // Freezing drizzle
  1171: "❄️", // Heavy freezing drizzle
  1180: "🌧️", // Patchy light rain
  1183: "🌧️", // Light rain
  1186: "🌧️", // Moderate rain at times
  1189: "🌧️", // Moderate rain
  1192: "🌧️", // Heavy rain at times
  1195: "🌧️", // Heavy rain
  1198: "❄️", // Light freezing rain
  1201: "❄️", // Moderate or heavy freezing rain
  1204: "❄️", // Light sleet
  1207: "❄️", // Moderate or heavy sleet
  1210: "❄️", // Patchy light snow
  1213: "❄️", // Light snow
  1216: "❄️", // Patchy moderate snow
  1219: "❄️", // Moderate snow
  1222: "❄️", // Patchy heavy snow
  1225: "❄️", // Heavy snow
  1237: "❄️", // Ice pellets
  1240: "🌧️", // Light rain shower
  1243: "🌧️", // Moderate or heavy rain shower
  1246: "🌧️", // Torrential rain shower
  1249: "❄️", // Light sleet showers
  1252: "❄️", // Moderate or heavy sleet showers
  1255: "❄️", // Light snow showers
  1258: "❄️", // Moderate or heavy snow showers
  1261: "❄️", // Light showers of ice pellets
  1264: "❄️", // Moderate or heavy showers of ice pellets
  1273: "⛈️", // Patchy light rain with thunder
  1276: "⛈️", // Moderate or heavy rain with thunder
  1279: "❄️⚡", // Patchy light snow with thunder
  1282: "❄️⚡" // Moderate or heavy snow with thunder
};

// Function to update the current time and timezone
function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeString = is24HourFormat ? `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}` : `${hour % 12 || 12}:${minute < 10 ? '0' + minute : minute} ${hour >= 12 ? 'PM' : 'AM'}`;
  document.getElementById("current-time").innerText = timeString;
  document.getElementById("timezone").innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("utc-offset").innerText = `${now.getTimezoneOffset() / -60} hours`;
}

// Function to update the background based on the time of day
function updateBackground() {
  const hour = new Date().getHours();
  let bgColor = "";

  if (hour >= 6 && hour < 12) {
    bgColor = "linear-gradient(to bottom, #FFD700, #87CEEB)"; // Morning
  } else if (hour >= 12 && hour < 18) {
    bgColor = "linear-gradient(to bottom, #87CEEB, #FFA07A)"; // Day
  } else if (hour >= 18 && hour < 21) {
    bgColor = "linear-gradient(to bottom, #FF6347, #2F4F4F)"; // Evening
  } else {
    bgColor = "linear-gradient(to bottom, #2F4F4F, #000080)"; // Night
  }

  document.body.style.background = bgColor;
}

// Fetch and display weather data with emojis
function fetchWeatherData() {
  const timestamp = new Date().getTime();

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=473310ccd9844cdea35235353251302&q=auto:ip&${timestamp}`
  )
    .then((response) => response.json())
    .then((data) => {
      const temperatureCelsius = data.current.temp_c;
      const windSpeedKph = data.current.wind_kph;
      const humidity = data.current.humidity;
      const weatherDescription = data.current.condition.text;
      const weatherCode = data.current.condition.code;

      const temperature = isMetric ? `${temperatureCelsius.toFixed(1)}°C` : `${(temperatureCelsius * 9 / 5 + 32).toFixed(1)}°F`;
      const windSpeed = isMetric ? `${windSpeedKph.toFixed(1)} kph` : `${(windSpeedKph * 0.621371).toFixed(1)} mph`;

      document.getElementById("temperature").innerText = temperature;
      document.getElementById("humidity").innerText = `${humidity}%`;
      document.getElementById("wind-speed").innerText = windSpeed;
      document.getElementById("weather-text").innerText = `${weatherEmojis[weatherCode] || "🌙"} ${weatherDescription}`;
    });
}

// Calculate days employed and total pay
let startDate = new Date('2024-09-21'); // Updated hire date
let dailyPay = 5; // Updated daily pay

// Function to calculate days employed
function calculateDaysEmployed() {
  const currentDate = new Date();
  const timeDifference = currentDate - startDate;
  const daysEmployed = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysEmployed;
}

// Function to calculate total pay
function calculateTotalPay() {
  const daysEmployed = calculateDaysEmployed();
  const totalPay = daysEmployed * dailyPay;
  return totalPay;
}

// Function to update the displayed information
function updateEmploymentInfo() {
  const daysEmployed = calculateDaysEmployed();
  const totalPay = calculateTotalPay();
  
  document.getElementById("days").innerText = `${daysEmployed}`;
  document.getElementById("earnings").innerText = `${totalPay.toFixed(2)}`;
}

// Toggle button functionality
document.getElementById("toggle-button").onclick = function () {
  is24HourFormat = !is24HourFormat;
  isMetric = !isMetric;
  updateTime();
  fetchWeatherData();
};

window.onload = () => {
  updateTime();
  updateBackground();
  fetchWeatherData();
  updateEmploymentInfo();
};

setInterval(updateTime, 1000);
setInterval(updateBackground, 60000);
setInterval(fetchWeatherData, 600000);
setInterval(updateEmploymentInfo, 86400000); // Update employment info every day
