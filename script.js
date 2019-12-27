// function getLocationPermissions(){

//   navigator.geolocation.getCurrentPosition(function(position){
//     console.log(position)
//   })

// }

// getLocationPermissions()



function initWeatherSearch() {


  const location = document.getElementById("location").value

  // 1. define our api calls 
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296` ;
  const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296`;

  // 2. define promises for endpoints
  const fetchWeather = fetch(currentWeatherURL);
  const fetchFiveDay = fetch(fiveDayURL);
  
  Promise.all([fetchWeather, fetchFiveDay]).then( allWeatherData => {
      
      const dataToJSON = {
          weather: allWeatherData[0].json(),
          fiveDay: allWeatherData[1].json()
      } 

      return dataToJSON

  }).then( parsedData => {

    const { weather, fiveDay } = parsedData
    weather.then(weatherData => {
      console.log(weatherData)
      generateWeatherHTML(weatherData)
  
      // make call to get UV index with weatherData.coords
      fetchUVIndex(weatherData.coord.lat, weatherData.coord.lon)
    })

    fiveDay.then(fiveDayData => {
      generateFiveDayHTML(fiveDayData)
    })

  })

}

function fetchUVIndex(lat, long) {
    console.log(lat, long)
    // now make api call to uv index endpoint

    // once you get that response call generateUVIndexHTML
}

function generateUVIndexHTML(uvIndex) {
  // do whaT YOU DID in generateWeatherHTML
}


function generateWeatherHTML (data) {
    $(".city").html("<h1>" + data.name + " Weather</h1>");
    $(".wind").text("Wind Speed: " + data.wind.speed);
    $(".humidity").text("Humidity%: " + data.main.humidity);
    $(".temp").text("Temperature (F) " + data.main.temp);
    $(".uvIndex").text("UV Index");
}

function generateFiveDayHTML (forecast) {
  var forecastTimes = [0, 7, 15, 23, 31, 39];
      var i;
        $("#forecastDisplay").empty();
          for (i = 0; i < forecastTimes.length; i++) {
            const date = new Date(forecast.list[forecastTimes[i]].dt_txt);
            const month = date.getMonth();
            const today = date.getDate();
            const year = date.getFullYear();
            const formattedDate = `${month}/${today}/${year}`;

            const dayHTML =`<div class="weather-box">
                <img src="http://openweathermap.org/img/wn/${forecast.list[forecastTimes[i]].weather[0].icon}@2x.png" alt="weather icon" />
                <div><b> ${formattedDate} </b></div>
                <div>Temp: ${forecast.list[forecastTimes[i]].main.temp}</div>
                <div>Humidity: ${forecast.list[forecastTimes[i]].main.humidity }</div>
              </div>`;
              $("#forecastDisplay").append(dayHTML);     
          }
}



// function getWeatherData(){
//   //  get value of location input
//   const location = document.getElementById("location").value
//   const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296`;
//   const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296`;
//   // const uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid={285389a3277aea781676df3316670296}&lat=${lat}&lon=${lon}`;


//   // I used a fetch call instead on an AJAX call to get data.  It was more streamlined and easier to read
//   fetch(queryURL).then(data => { 
    
    
//     return data.json();
  
  
  
  
//   }).then(weather => { 
  
  
  
  
//     console.log("weather", weather) 


//     // Transfer content to HTML
//     $(".city").html("<h1>" + weather.name + " Weather</h1>");
//     $(".wind").text("Wind Speed: " + weather.wind.speed);
//     $(".humidity").text("Humidity%: " + weather.main.humidity);
//     $(".temp").text("Temperature (F) " + weather.main.temp);
//     $(".uvIndex").text("UV Index");


//     })

//     fetch(fiveDayURL).then(data => { 
    
    
//       return data.json();
    
    
    
    
    
//     }).then(forecast => { 

//       var forecastTimes = [0, 7, 15, 23, 31, 39];
//       var i;
//         $("#forecastDisplay").empty();
//           for (i = 0; i < forecastTimes.length; i++) {
              
//               var date = new Date(forecast.list[forecastTimes[i]].dt_txt);
              
//               const month = date.getMonth();
//               const today = date.getDate();
//               const year = date.getFullYear();
              
//               const formattedDate = `${month}/${today}/${year}`;


//               const dayHTML =`<div class="weather-box">
//                   <img src="http://openweathermap.org/img/wn/${forecast.list[forecastTimes[i]].weather[0].icon}@2x.png" alt="weather icon" />
//                   <div><b> ${formattedDate} </b></div>
//                   <div>Temp: ${forecast.list[forecastTimes[i]].main.temp}</div>
//                   <div>Humidity: ${forecast.list[forecastTimes[i]].main.humidity }</div>
//                 </div>`;

//                 $("#forecastDisplay").append(dayHTML);     
//           }

  
      
    
    
    
    
//       console.log("forecast", forecast) 
      


      
    
//       })

    

// }