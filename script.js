let long;
let lat; 
const apiKey = '0e9ffa29ef7bd2a1ed14725d5878aab9'

window.addEventListener('keypress', (e) => { if (e.key == "Enter") getDiffrentData()})

function startApp() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
                long = position.coords.longitude
                lat = position.coords.latitude
                console.log('long: '+long + ' lat: '+lat)
                getWeatherData()
            }
        );
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
    
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
    let city = data.name
    let weather = data.weather[0].main
    let icon = data.weather[0].icon

    document.getElementById('temp').innerHTML = temp.toFixed(1)
    document.getElementById('pressure').innerHTML = pressure
    document.getElementById('humidity').innerHTML = humidity
    document.getElementById('search').value = city
    document.getElementById('weather').innerHTML = weather

    document.getElementById('emoji').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    timer(data)

    console.log(weather)
    if(weather == "Clouds")
    document.body.style.backgroundImage = 'url(cloud.jpg)'
    else if (weather == "Rain")
    document.body.style.backgroundImage = 'url(rain.jpg)'
    else if (weather == "Mist")
    document.body.style.backgroundImage = 'url(mist.jpg)'
    else if (weather == "Clear")
    document.body.style.backgroundImage = 'url(sunny.jpg)'
}

function timer(data)
{
    let today = new Date(data.dt*1000 + (data.timezone*1000))
    console.log(today)

    let day = today.getDay()
    let dayofm = today.getDate()
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
    document.getElementById('date').innerHTML=dayofm + ' -'
    document.getElementById('month').innerHTML=month + ' -'
    document.getElementById('year').innerHTML=year
}
setInterval(timer(),1000);

function getDiffrentData() {
    let cityname = document.getElementById('search').value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`
    console.log(cityname)
    
    fetch(url).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            updateWeatherData(data)
        })
    })
}

