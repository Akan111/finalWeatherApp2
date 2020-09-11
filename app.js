const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImg = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const kelvinToCelcius = (kelvin) => {
    const celcius = Math.round(kelvin - 273.15);
    return celcius;
}

const isDayTime = (icon) => {
    if (icon.includes('d')) {
        return true;
    }else {
        return false;
    }
}

updateWeatherApp = (city) => {
    const imgName = city.weather[0].icon
    const iconSrc = `https://openweathermap.org/img/wn/${imgName}@2x.png`;
    console.log(city);
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
        
        <div class="col-8 text-center temp">
            <span>${kelvinToCelcius(city.main.temp)}&deg;c</span>
        </div>
        <div class="col-4 condition-temp">
            <p class="condition">${city.weather[0].description}</p>
            <p class="high">${kelvinToCelcius(city.main.temp_max)}&deg;c</p>
            <p class="low">${kelvinToCelcius(city.main.temp_min)}&deg;c</p>
        </div>
    </div>

    <div class="icon-container card shadow mx-auto">
        <img src="${iconSrc}" alt="">
    </div>  

    <div class="card-bottom px-5 py-4 row">
        <div class="col text-center">
            <p>${kelvinToCelcius(city.main.feels_like)}&deg;c</p>
            <span>Feels like</span>
        </div>
        <div class="col text-center">
            <p>${kelvinToCelcius(city.main.humidity)}%</p>
            <span>Humidity</span>
        </div>
        
    </div>
    `

    if (isDayTime(imgName)) {
        // console.log('Day');
        timeImg.setAttribute('src', 'img/day_image.svg')
        cityName.classList.add('text-dark')
    }else {
        // console.log('Night')
        timeImg.setAttribute('src', 'img/night_image.svg')
        cityName.classList.add('text-black')
    }

    cardInfo.classList.remove('d-none');
}

//add an event listener to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const searchedCity = cityValue.value.trim();
    searchForm.reset();
    // console.log(searchedCity);
    requestCity(searchedCity)
        .then(data => {
            updateWeatherApp(data)
        })
        .catch(error => {console.log(error)})
})
