import { useState } from "react";
import Search from "./components/Search/search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecas from "./components/forecast/Forecas.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
    const [lat, lon] = searchData.value.split(" ");
    console.log(lat)

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        console.log(searchData.label)

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        console.log(weatherResponse)
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />} 
      {forecast && <Forecas data={forecast} />}
    </div>
  );
}

export default App;