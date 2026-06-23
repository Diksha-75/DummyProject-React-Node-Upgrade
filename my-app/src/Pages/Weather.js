import { useEffect, useState } from "react";
import "../App.css";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  return (
    <div className="weather-box">
      <h2>Weather</h2>

      {weather && (
        <>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed}</p>
        </>
      )}
    </div>
  );
}

export default Weather;