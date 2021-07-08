let long;
let lat; 
const apiKey = '0e9ffa29ef7bd2a1ed14725d5878aab9'

function startApp() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
                long = position.coords.latitude
                lat = position.coords.longitude
                console.log('long: '+long + ' lat: '+lat)
                getWeatherData()
            }
        );
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url)

    fetch(url).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            updateWeatherData(data)
        })
    })
}

function updateWeatherData(data) {
    let temp = data.main.temp
    let pressure = data.main.pressure
    let humidity = data.main.humidity
    let country = data.sys.country
    let city = data.name
    let weather = data.weather[0].main
    let icon = data.weather[0].icon
    let sunRise = new Date(data.sys.sunRise * 1000)

    document.getElementById('temp').innerHTML = temp.toFixed(1)
    document.getElementById('pressure').innerHTML = pressure
    document.getElementById('humidity').innerHTML = humidity
    document.getElementById('search').value = country
    document.getElementById('weather').innerHTML = weather

    document.getElementById('emoji').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    timer()
}

function timer()
{
    let today = new Date()

    let day = today.getDay()
    let date = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()

    switch(day) {
        case 1:
        day='Monday'
        break;
        case 2:
        day='Tuesday'
        break;
        case 3:
        day='Wednesday'
        break;
        case 4:
        day='Thursday'
        break;
        case 5:
        day='Friday'
        break;
        case 6:
        day='Saturday'
        break;
        case 7:
        day='Sunday'
        break;
    }

    document.getElementById('day').innerHTML = day
    document.getElementById('date').innerHTML=date + ' -'
    if (date<10) date='0'+date;
    document.getElementById('month').innerHTML=month + ' -'
    if (month<10) month='0'+month;
    document.getElementById('year').innerHTML=year

    setTimeout(timer(),64000);
}


