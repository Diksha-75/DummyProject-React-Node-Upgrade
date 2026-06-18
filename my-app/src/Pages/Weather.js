import {
  useEffect,
  useState
} from "react";

function Weather() {
  const [weather, setWeather] =
    useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.85&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) =>
        setWeather(
          data.current_weather
        )
      );
  }, []);

  return (
    <div>
      <h2>Weather</h2>

      {weather && (
        <>
          <p>
            Temperature:
            {weather.temperature}
            °C
          </p>

          <p>
            Wind Speed:
            {weather.windspeed}
          </p>
        </>
      )}
    </div>
  );
}

export default Weather;