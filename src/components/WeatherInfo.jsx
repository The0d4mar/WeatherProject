import React, { useEffect, useState } from 'react';
import '../styles/weather.css'; // Подключаем стили для компонента

function Weather({ latitude, longitude, city }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);

  console.log(city);

  useEffect(() => {
    if (latitude && longitude) {
      const apiKey = '2506d981a9aa8390031808d805c827b7';

      const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

      fetch(currentWeatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeather(data);
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о текущей погоде:', error);
        });

      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ru`;

      fetch(forecastApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const filteredForecast = data.list.filter((forecast, index) => index % 8 === 0 && index < 40);
          setDailyForecast(filteredForecast);
        })
        .catch((error) => {
          console.error('Ошибка при получении прогноза погоды на пять дней:', error);
        });
    }
  }, [latitude, longitude]);

  return (
    <div className="weather-container">
      <div className="current-weather">
        <div className='weather-header'>
          <h2>Current weather in {city}</h2>
          <p>Selected coordinates: {latitude}, {longitude}</p>
          {currentWeather && (
            <div>
              <h2><p>Temperature: {Math.round(currentWeather.main.temp)} °C</p></h2>
              <h2><p>Description: {currentWeather.weather[0].description}</p></h2>
            </div>
          )}
          </div>
      </div>

      <div className="forecast">
        <h2>5 day forecast</h2>

        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Температура (°C)</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {dailyForecast.map((forecast, index) => (
              <tr key={index}>
                <td>{new Date(forecast.dt_txt).toLocaleDateString()}</td>
                <td>{Math.round(forecast.main.temp)}</td>
                <td>{forecast.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Weather;
