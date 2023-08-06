
import {WeatherAPI} from "./weather-api.js";

class WeatherApp{

  init(){

    this.addEventHandler();
  }
  
  addEventHandler(){

    const searchBoxElement = document.querySelector(".search-box");

    searchBoxElement.param1 = this;
    searchBoxElement.addEventListener("keypress", this.handleEvent);
  }

  handleEvent(event){

    if (event.key === "Enter" || event.keyCode == 13){

      const eventTarget = event.target;
      const userData = eventTarget.value;
  
      console.log("Event Target . Param 1" + eventTarget.param1);

      const weatherAppObj = eventTarget.param1

      const weatherAPI = new WeatherAPI(userData);
      weatherAPI.buildURL();
      weatherAPI.invokeAPI()
        .then( (responseJSON) => {

          console.log(`Response is `);
          console.log(responseJSON);

          weatherAppObj.updateUI(responseJSON)
        })  
    }
  }

  updateUI(responseJSON){

    const cityElement = document.querySelector(".location .city");
    cityElement.innerText = 
      `${responseJSON.name} , ${responseJSON.sys.country}`

    const dateElement = document.querySelector(".location .date");
    dateElement.innerText = `${this.formatDate()}`;

    const temperateElement = document.querySelector(".current .temp");
    temperateElement.innerText = `${responseJSON.main.temp} °c`;

    const weatherTypeElement = document.querySelector(".current .weather");
    weatherTypeElement.innerText = `${responseJSON.weather[0].description}`;


    const minMaxElement = document.querySelector(".current .hi-low");
    minMaxElement.innerText = `${responseJSON.main.temp_min} °c / ${responseJSON.main.temp_max} °c`
  }

  formatDate(){

    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday : 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

export {WeatherApp};