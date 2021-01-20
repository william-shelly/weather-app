var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var APIKey = '48f0428f28c93f644cc6b0f572823589';
var zip = '90210';
var country = 'us';
var units = 'imperial'
var openLink = link + zip + ',' + country + '&units=' + units;

var cityOutput = document.querySelector('#cityName');
var ZIPEntered = document.querySelector('#ZIPEntered');

var title = document.querySelector('title');

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
    document.querySelector('#icon').innerHTML = 'Icon: <img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="' + main + '"/>';
});
    request.open('GET', openLink + '&appid=' + APIKey);
    request.send();

    /* weather */
