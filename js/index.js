var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var APIKey = '48f0428f28c93f644cc6b0f572823589';
var zip = '90210';
var country = 'us';
var units = 'imperial'
var openLink = link + zip + ',' + country + '&units=' + units;
// var iconLink = 'http://openweathermap.org/img/wn/';
var iconLink = 'img/';

var cityOutput = document.querySelector('#cityName');
var ZIPEntered = document.querySelector('#ZIPEntered');
var findWeatherButton = document.querySelector('#findWeather');

var zipInputValue = ZIPEntered.value;
zipInputValue = zip;

var title = document.querySelector('title');

function getZIP() {
    console.log(zipInputValue);
    ZIPEntered.focus();
}

document.addEventListener('DOMContentLoaded', function(){
    startDateTime();
    ZIPEntered.focus();
});

if (findWeatherButton !== undefined || findWeatherButton !== null ) {
	findWeatherButton.onclick = function(event) {
        console.log('yo');
        getZIP();
	};
}

ZIPEntered.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log('hello');
        getZIP();
    }
});

let request = new XMLHttpRequest();
request.addEventListener('load', function() {
    let obj = JSON.parse(this.responseText);
    let cityName = obj.name;
    let temp = obj.main.temp;
    let temp_min =obj.main.temp_min;
    let temp_max =obj.main.temp_max;
    let humidity =obj.main.humidity;


    let timestamp = obj.dt;
    let sunrise = obj.sys.sunrise;
    let sunset = obj.sys.sunset;
    let timezone = obj.timezone;
    /* let conditionID = obj.weather[0].id; */
    let main = obj.weather[0].main;
    let description = obj.weather[0].description;
    let icon = obj.weather[0].icon;
    icon = icon.replace('d', '').replace('n','');

    let unix_timestamp = timestamp;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);

    title.innerText = cityName + ' Weather';
    cityOutput.innerText = cityName + ' Weather';
    document.querySelector('#temp').innerHTML = 'Current Temp: ' + temp + '&deg;';
    document.querySelector('#temp_min').innerHTML = 'Low: ' + temp_min + '&deg;';
    document.querySelector('#temp_max').innerHTML = 'High: ' + temp_max + '&deg;';
    document.querySelector('#humidity').innerHTML = 'Humidity: ' + humidity;
    document.querySelector('#timestamp').innerHTML = 'Time: ' + timestamp;
    document.querySelector('#sunrise').innerHTML = 'Sunrise: ' + sunrise;
    document.querySelector('#sunset').innerHTML = 'Sunset: ' + sunset;
    /* document.querySelector('#conditionID').innerHTML = 'conditionID: ' + conditionID; */
    document.querySelector('#timezone').innerHTML = 'Time: ' + timezone;
    document.querySelector('#main').innerHTML = 'Current Weather: ' + main;
    document.querySelector('#description').innerHTML = 'Description: ' + description;
    document.querySelector('#icon').innerHTML = 'Icon: <img src="' + iconLink + icon + '.svg" alt="' + main + '"/>';
});
    request.open('GET', openLink + '&appid=' + APIKey);
    request.send();

    /* weather */

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
