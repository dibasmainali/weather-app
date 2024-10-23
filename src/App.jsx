import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./component/SearchEngine";
import Forecast from "./component/Forecast";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setWeather({ ...weather, error: true });
      return;
    }
    setWeather({ ...weather, loading: true });

    const apiKey = "b03a640e5ef6980o4da35b006t5f2942"; // Weather API key
    const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

    try {
      const res = await axios.get(url);
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ data: {}, loading: false, error: true });
      console.log("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("Error fetching weather:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchData("27.6710", "85.4298");  
        }
      );
    } else {
      fetchData("27.6710", "85.4298");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 text-center p-4">
      {/* Search Engine */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {/* Loading spinner */}
      {weather.loading && (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <h4 className="text-lg font-medium text-gray-700">Fetching weather...</h4>
        </div>
      )}

      {/* Error Message */}
      {weather.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <span>City not found. Please try again.</span>
        </div>
      )}

      {/* Forecast Data */}
      {weather.data && weather.data.condition && (
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default App;
