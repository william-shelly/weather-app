/* set up AJAX */
var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var APIKey = '48f0428f28c93f644cc6b0f572823589';

var zip = '';
var defaultZIP = '74101';
if (zip === '' || zip === null || undefined ) {
    zip = defaultZIP;
}

var country = 'us';
var units = 'imperial'
var openLink = link + zip + ',' + country + '&units=' + units;
var iconLink = 'img/';

/* set up form elements */

var cityOutput = document.querySelector('#cityName');
var ZIPEntered = document.querySelector('#ZIPEntered');
var findWeatherButton = document.querySelector('#findWeather');
var appContainer = document.querySelector('#app-container');

var title = document.querySelector('title');

document.addEventListener('DOMContentLoaded', function(){
    startDateTime();
    getWeather();
    ZIPEntered.focus();
});

if (findWeatherButton !== undefined || findWeatherButton !== null ) {
	findWeatherButton.onclick = function(e) {
        console.log('findWeatherButton clicked');
        getZIP();
        openLink = link + zip + ',' + country + '&units=' + units;
        getWeather();
        setZIPEnteredField();
	};
} else {
    console.log('findWeatherButton doest exist?');
}

if (ZIPEntered !== '' || ZIPEntered !== undefined || ZIPEntered !== null ) {
    ZIPEntered.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            console.log('ZIPEntered Enter Key Pressed');
            getZIP();
            openLink = link + zip + ',' + country + '&units=' + units;
            getWeather();
            setZIPEnteredField();
        }
    });
}

function getZIP() {
    zip = ZIPEntered.value;
    console.log(zip);
}

function setZIPEnteredField() {
    ZIPEntered.focus();
    ZIPEntered.value = '';
    ZIPEntered.setAttribute("placeholder",zip);
}

/* getWeather */

function getWeather() {
    console.log('Start getWeather');
    console.log('getWeather function zip value: ' + zip);
    let request = new XMLHttpRequest();
    request.addEventListener('load', function() {
        let obj = JSON.parse(this.responseText);
        let cityName = obj.name;
        let temp = obj.main.temp;
        let temp_min =obj.main.temp_min;
        let temp_max =obj.main.temp_max;
        let humidity =obj.main.humidity;

        let timezone = obj.timezone;
        let timestamp = obj.dt;
        let newTimestamp = timestamp;
        let sunrise = obj.sys.sunrise;
        let sunset = obj.sys.sunset;

        /* let conditionID = obj.weather[0].id; */
        let weatherID = obj.weather[0].id;
        weatherID = weatherID.toString()
        let main = obj.weather[0].main;
        let description = obj.weather[0].description;
        let icon = obj.weather[0].icon;
        icon = icon.replace('d', '').replace('n','');

        title.innerText = cityName + ' Weather';
        cityOutput.innerHTML = cityName;
        document.querySelector('#temp').innerHTML = Math.trunc(temp) + '&deg;';
        document.querySelector('#temp_min').innerHTML = 'Temp Low: ' + temp_min + '&deg;';
        document.querySelector('#temp_max').innerHTML = 'Temp High: ' + temp_max + '&deg;';
        document.querySelector('#main').innerHTML = main;
        appContainer.setAttribute('class','');
        appContainer.classList.add(main.toLowerCase());
        appContainer.classList.add('group-' + weatherID.substring(0, weatherID.length - 2));
        document.querySelector('#icon').innerHTML = '<img class="ws-drop-shadow" src="' + iconLink + icon + '.svg" alt="' + main + '"/>';
    });
    request.open('GET', openLink + '&appid=' + APIKey);
    request.send();
    console.log('END getWeather');
}

/* /getWeather */

function startDateTime() {
    let d = new Date();
    let day = d.getDay();
    let dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let month = d.getMonth();
    let monthName = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let date = d.getDate();
    let year = d.getFullYear();
    // let time = d.getTime();

    let dateTimeContainer = document.querySelector('#dateTime');
    dateTimeContainer.innerHTML = '<strong>Today</strong>: ' + dayName[day] + ', ' + monthName[month] + ' ' + date + ', ' + year + ' ';
}

function convertTimeZone(time) {
    return time = time/60/60;
}

function convertUnixTime(givenTime) {
    let timeToConvert = new Date(givenTime * 1000);
    console.log(timeToConvert);
    let hours = timeToConvert.getHours();
    let minutes = timeToConvert.getMinutes();
    return hours + ':' + minutes;
}
