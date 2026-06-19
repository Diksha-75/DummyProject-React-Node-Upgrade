import { useEffect, useState } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  return (
    <div>
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