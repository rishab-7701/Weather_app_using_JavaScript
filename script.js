const apiKey ="eff698fde0e46d011ee17a90249c71f8";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const temp = document.querySelector('.temp');
const city_2 = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
// const error_display = document.querySelector('.erorr');

async function checkWeather(city){

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        // this if checks if the response of the fetched api/url is valid i.e; within range (200-299) then it shows the relevant data of the entered city
        if (response.ok) {
             // whenever we search a city by clicking on the search Button then only weather display will be made to block
            const weatherDiv =  document.querySelector('.weather');
            const errorDiv = document.querySelector('.error');
            if(weatherDiv){
                  weatherDiv.style.display = "block";
                  errorDiv.style.display = "none";
            }else{
                console.error('Weather div not found');
            }
        }
        
    
    var data = await response.json(); // .json method changes the data fetched from the url in the variable response into json format,i.e;object:key->value pairs

    console.log(data);

    // we need to update temp,city,humidity and wind information/data coming from the api --> openweathermap 
    // below 4 lines of code updates the data fetched from the Api
    temp.innerHTML = Math.round(data.main.temp)+ "°C";
    city_2.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    // these if conditions is written to change the image according to the weather conditions of the city entered by the user
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Drizzle    "){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    
}
     catch (error) {
        console.error('Error:', error);
        const errorDiv = document.querySelector('.error');
        const weatherDiv =  document.querySelector('.weather');
        if(errorDiv){
             errorDiv.style.display = "block";
             weatherDiv.style.display = "none";
        }else {
            console.error('Error div not found');
          }
    }
   
}

// checkWeather();

// whenever we click on the search button the entered city name should be sent
// to our function checkWeather() to fetch data from the API and send back the details and display it on the screen

searchBtn.addEventListener('click',function(){
    checkWeather(searchBox.value);
})


