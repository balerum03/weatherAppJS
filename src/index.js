import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

const search_bar = document.querySelector('#city_collector');
const button = document.querySelector('#city_button');
const api_key = '23f4808ad2b423efacaafda136f02cd6';

const getData = async (api_link) => {
    try {
        const myData = await fetch(api_link);
        if (myData.ok) {
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
                pressure: myDataJSON.main.pressure
            };
            return dataObj;
        }else {
            throw new Error(404);
        }
    }catch(err){
        document.querySelector('#warning-text').innerText = 'There was a problem while getting the data';
    }
};

button.addEventListener('click', async (e) => {
    const city = document.querySelector('#city_collector').value;
    const api_link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const data = await getData(api_link);
    dataDisplay(data);
})

search_bar.addEventListener('keyup',(e) => {
    console.log(e);
    if (e.keyCode === 13){
        button.click();
    }
})

 const dataDisplay = (data) => {
    document.querySelector('#city_name').innerText = data.city;
    document.querySelector('#icon').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    document.querySelector('#tempP').innerText = `${(data.weather-273.15).toFixed(2)} °C`;
    document.querySelector('#descriptionP').innerText = data.weatherDesc;
    document.querySelector('#wind_speedP').innerText = `Wind Speed: ${data.wind} mph`;
    document.querySelector('#max_tempP').innerText = `Max Temp: ${(data.maxTemp-273.15).toFixed(2)} °C`;
    document.querySelector('#min_tempP').innerText = `Min Temp: ${(data.minTemp-273.15).toFixed(2)} °C`;
    document.querySelector('#feelP').innerText = `Feels Like: ${(data.feelsLike-273.15).toFixed(2)} °C`;
    document.querySelector('#humidityP').innerText = `Humidity: ${data.humidity}`;
    document.querySelector('#pressureP').innerText = `Pressure: ${data.pressure}`;
 }

 (async() => {
    const defaultData = await getData(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=23f4808ad2b423efacaafda136f02cd6`);
    dataDisplay(defaultData);
 })();  