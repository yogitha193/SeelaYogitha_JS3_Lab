
import {WeatherAPI} from "./weather-api.js";

function testBuildURL(){

  const weatherAPI = new WeatherAPI("France");

  weatherAPI.buildURL();

}

async function testInvokeAPI(){

  const weatherAPI = new WeatherAPI("France");
  weatherAPI.buildURL();

  const jsonResponse = await weatherAPI.invokeAPI();
  console.log(jsonResponse);
}

// testBuildURL();

testInvokeAPI();
