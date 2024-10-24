import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchForecastData();
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    return isCelsius ? Math.round(temperature) : convertToFahrenheit(temperature);
  };

  if (loading) {
    return <div className="text-gray-500 text-xl">Loading forecast...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl">Error loading forecast.</div>;
  }

  return (
    <div className="forecast-container p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* City Name */}
      <div className="city-name text-3xl font-bold mb-2 text-center sm:text-left">
        {data.city}, <span className="text-gray-600">{data.country}</span>
      </div>

      {/* Current Date */}
      <div className="date text-gray-600 mb-4 text-center sm:text-left">
        <span>{getCurrentDate()}</span>
      </div>

      {/* Current Temperature */}
      <div className="temp flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-4">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="w-20 h-20 mx-auto sm:mx-0"
          />
        )}
        <div className="text-5xl font-bold mx-4 text-center sm:text-left">
          {renderTemperature(data.temperature.current)}
          <sup
            className="text-lg cursor-pointer hover:text-blue-500 ml-2"
            onClick={toggleTemperatureUnit}
          >
            {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
          </sup>
        </div>
      </div>

      {/* Weather Description */}
      <p className="weather-des text-gray-600 mb-6 text-center sm:text-left">
        {data.condition.description}
      </p>

      {/* Wind and Humidity Info */}
      <div className="weather-info grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="col flex items-center justify-center sm:justify-start">
          <ReactAnimatedWeather icon="WIND" size={40} />
          <div className="ml-2">
            <p className="wind text-xl">{data.wind.speed} m/s</p>
            <p className="text-sm text-gray-600">Wind speed</p>
          </div>
        </div>
        <div className="col flex items-center justify-center sm:justify-start">
          <ReactAnimatedWeather icon="RAIN" size={40} />
          <div className="ml-2">
            <p className="humidity text-xl">{data.temperature.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="forecast mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center sm:text-left">
          5-Day Forecast:
        </h3>
        <div className="forecast-container grid grid-cols-2 sm:grid-cols-5 gap-4">
          {forecastData &&
            forecastData.slice(0, 5).map((day) => (
              <div
                className="day flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                key={day.time}
              >
                <p className="day-name text-lg font-semibold mb-2">
                  {formatDay(day.time)}
                </p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon w-12 h-12 mb-2"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature text-xl">
                  {Math.round(day.temperature.minimum)}° /{" "}
                  <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
