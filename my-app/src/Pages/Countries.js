import { useEffect, useState } from "react";
import "../App.css";

function Countries() {
  const [region, setRegion] = useState("asia");
  const [countries, setCountries] = useState([]);
  const [showPopulation, setShowPopulation] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch(`http://localhost:5000/api/countries/${region}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.log("Invalid API response:", data);
          setCountries([]);
          return;
        }

        setCountries(data);
      })
      
      .catch(() => setCountries([]));
  }, [region]);

  const style = {
    background: theme === "dark" ? "#111" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "10px"
  };

  return (
    <div className="scroll-box" style={style}>
      <h2>Countries</h2>

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="asia">asia</option>
        <option value="europe">europe</option>
        <option value="africa">africa</option>
        <option value="americas">americas</option>
        <option value="oceania">oceania</option>
      </select>

      <br /><br />

      <label>
        <input
          type="radio"
          value="light"
          checked={theme === "light"}
          onChange={(e) => setTheme(e.target.value)}
        />
        Light
      </label>

      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.value)}
        />
        Dark
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={showPopulation}
          onChange={() => setShowPopulation(!showPopulation)}
        />
        Show Population
      </label>
      {countries.length > 0 && (
      <pre>{JSON.stringify(countries[0], null, 2)}</pre>
    )}
      <div style={{ height: "350px", overflowY: "scroll", border: "1px solid gray" }}>

        {Array.isArray(countries) &&
          countries.map((c) => (
            <div key={c.code} className="country-card">
              {/* <h4>{c.name.common}</h4> */}
              <h4>{c.name}</h4>
              {/* <p>Population: {c.population.toLocaleString()}</p> */}

              {showPopulation && (
                <p>Population: {c.population ? c.population.toLocaleString() : "N/A"}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Countries;