import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

const searchBar = document.querySelector('#city_collector');
const button = document.querySelector('#city_button');
const changeBtn = document.querySelector('#change-temp');
const apiKey = '23f4808ad2b423efacaafda136f02cd6';

const getData = async (apiLink) => {
  try {
    const myData = await fetch(apiLink);
    document.querySelector('#warning-text').innerText = null;
    const myDataJSON = await myData.json();
    const dataObj = {
      city: myDataJSON.name,
      weather: myDataJSON.main.temp,
      minTemp: myDataJSON.main.temp_min,
      maxTemp: myDataJSON.main.temp_max,
      humidity: myDataJSON.main.humidity,
      feelsLike: myDataJSON.main.feels_like,
      weatherDesc: myDataJSON.weather[0].description,
      icon: myDataJSON.weather[0].icon,
      wind: myDataJSON.wind.speed,
      pressure: myDataJSON.main.pressure,
    };
    return dataObj;
  } catch (err) {
    document.querySelector('#warning-text').innerText = 'There was a problem while getting the data';
  }
  return null;
};

const dataDisplay = (data) => {
  document.querySelector('#city_name').innerText = data.city;
  document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  document.querySelector('#tempP').innerText = `${(data.weather - 273.15).toFixed(2)} °C`;
  document.querySelector('#tempPF').innerText = `${((data.weather - 273.15) * 1.8000 + 32.00).toFixed(2)} °F`;
  document.querySelector('#descriptionP').innerText = data.weatherDesc;
  document.querySelector('#wind_speedP').innerText = `Wind Speed: ${data.wind} mph`;
  document.querySelector('#max_tempP').innerText = `Max Temp: ${(data.maxTemp - 273.15).toFixed(2)} °C`;
  document.querySelector('#min_tempP').innerText = `Min Temp: ${(data.minTemp - 273.15).toFixed(2)} °C`;
  document.querySelector('#feelP').innerText = `Feels Like: ${(data.feelsLike - 273.15).toFixed(2)} °C`;
  document.querySelector('#max_tempPF').innerText = `Max Temp: ${((data.maxTemp - 273.15) * 1.8000 + 32.00).toFixed(2)} °F`;
  document.querySelector('#min_tempPF').innerText = `Min Temp: ${((data.minTemp - 273.15) * 1.8000 + 32.00).toFixed(2)} °F`;
  document.querySelector('#feelPF').innerText = `Feels Like: ${((data.feelsLike - 273.15) * 1.8000 + 32.00).toFixed(2)} °F`;
  document.querySelector('#humidityP').innerText = `Humidity: ${data.humidity}`;
  document.querySelector('#pressureP').innerText = `Pressure: ${data.pressure}`;
};

button.addEventListener('click', async () => {
  const city = document.querySelector('#city_collector').value;
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const data = await getData(apiLink);
  dataDisplay(data);
});

searchBar.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    button.click();
  }
});

changeBtn.addEventListener('click', () => {
  document.querySelector('#tempP').classList.toggle('d-none');
  document.querySelector('#tempPF').classList.toggle('d-block');
  document.querySelector('#max_tempPF').classList.toggle('d-block');
  document.querySelector('#max_tempP').classList.toggle('d-none');
  document.querySelector('#min_tempPF').classList.toggle('d-block');
  document.querySelector('#min_tempP').classList.toggle('d-none');
  document.querySelector('#feelPF').classList.toggle('d-block');
  document.querySelector('#feelP').classList.toggle('d-none');
});

(async () => {
  const defaultData = await getData('https://api.openweathermap.org/data/2.5/weather?q=London&appid=23f4808ad2b423efacaafda136f02cd6');
  dataDisplay(defaultData);
})();
