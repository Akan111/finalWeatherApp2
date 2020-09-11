// api key : 82005d27a116c2880c8f0fcb866998a0
// api key : a1061b93d16bc20eff0f5442ce9a63a4

const key = "a1061b93d16bc20eff0f5442ce9a63a4";

// const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=a1061b93d16bc20eff0f5442ce9a63a4";

// fetch(baseURL)
//     .then((data) => {console.log('response', data.json())})
//     .catch((error) => {
//         console.log(error);
//     })

const requestCity = async (city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json()
    return data;
}

requestCity("Uyo");