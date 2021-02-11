import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

const button = document.querySelector('#city_button');
const api_key = '23f4808ad2b423efacaafda136f02cd6';

const getData = async (api_link) => {
    const myData = await fetch(api_link);
    if (myData.ok) {
        const myDataJSON = await myData.json();
        document.querySelector('#hello').innerText = myDataJSON.name;
        const icon = myDataJSON.weather[0].icon;
        document.querySelector('#weather_icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('#weather_icon').classList.remove('d-none');
    }else {
        throw Error(404);
    }
};

button.addEventListener('click', (e) => {
    const city = document.querySelector('#city_collector').value;
    const api_link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    getData(api_link);
})