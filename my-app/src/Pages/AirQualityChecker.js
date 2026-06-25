
import { useEffect, useState } from "react";
import "../App.css";

function AirQualityChecker() {
  const [city, setCity] = useState("mumbai");
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showAQI, setShowAQI] = useState(false);
  const [theme, setTheme] = useState("light");

  const cities = [
    "mumbai",
    "delhi",
    "pune",
    "bangalore",
    "chennai",
    "kolkata",
    "hyderabad",
  ];

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/aqi/${city}`
        );

        const data = await res.json();
        setAqi(data.aqi);
      } catch (err) {
        console.error(err);
        setAqi(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
  }, [city]);

  return (
    <div className={`scroll-box ${theme}`}>
      <h2>Air Quality Checker</h2>

      {/* Theme Radio Buttons */}
      <h3>Theme</h3>

      <label>
        <input
          type="radio"
          value="light"
          checked={theme === "light"}
          onChange={(e) => setTheme(e.target.value)}
        />
        Light Mode
      </label>

      <label style={{ marginLeft: "15px" }}>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.value)}
        />
        Dark Mode
      </label>

      <br />
      <br />

      {/* City Dropdown */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <br />
      <br />

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          checked={showAQI}
          onChange={(e) => setShowAQI(e.target.checked)}
        />
        Show AQI
      </label>

      <br />
      <br />

      {loading && <p>Loading AQI...</p>}

      {showAQI && !loading && aqi !== null && (
        <div>
          <h3>City: {city}</h3>
          <h3>AQI: {aqi}</h3>
        </div>
      )}

      {showAQI && !loading && aqi === null && (
        <p>No AQI data available.</p>
      )}
    </div>
  );
}

export default AirQualityChecker;