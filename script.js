function getWeatherData(){
  //  get value of location input
  const location = document.getElementById("location").value
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296`;
  const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=285389a3277aea781676df3316670296`;
  // const uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid={285389a3277aea781676df3316670296}&lat=${lat}&lon=${lon}`;


  // I used a fetch call instead on an AJAX call to get data.  It was more streamlined and easier to read
  fetch(queryURL).then(data => { 
    
    
    return data.json();
  
  
  
  
  }).then(weather => { 
  
  
  
  
    console.log("weather", weather) 


    // Transfer content to HTML
    $(".city").html("<h1>" + weather.name + " Weather</h1>");
    $(".wind").text("Wind Speed: " + weather.wind.speed);
    $(".humidity").text("Humidity%: " + weather.main.humidity);
    $(".temp").text("Temperature (F) " + weather.main.temp);


    })

    fetch(fiveDayURL).then(data => { 
    
    
      return data.json();
    
    
    
    
    }).then(forecast => { 

      var forecastTimes = [0, 7, 15, 23, 31, 39];
        var i;
        $("#forecastDisplay").empty();
          for (i = 0; i < forecastTimes.length; i++) {
            var date = forecast.list[forecastTimes[i]].dt_txt
              $('#forecastDisplay').append("<li>" + "Date: " + forecast.list[forecastTimes[i]].dt_txt + "</li>");
              $('#forecastDisplay').append("<li>" + "Temp: " + forecast.list[forecastTimes[i]].main.temp + "</li>");
              $('#forecastDisplay').append("<li>" + "Humidity: " + forecast.list[forecastTimes[i]].main.humidity + "</li>");
              $('#forecastDisplay').append("<image src=http://openweathermap.org/img/wn/" + forecast.list[forecastTimes[i]].weather[0].icon + "@2x.png id=icon1>");
     }

  
      
    
    
    
    
      console.log("forecast", forecast) 
      


      
    
      })

    

}