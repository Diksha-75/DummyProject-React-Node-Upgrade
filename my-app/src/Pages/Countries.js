import { useEffect, useState } from "react";

function Countries() {
  const [region, setRegion] = useState("Asia");
  const [countries, setCountries] = useState([]);
  const [showPopulation, setShowPopulation] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch(`http://localhost:5000/api/countries/${region}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
        }
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
    <div style={style}>
      <h2>Countries</h2>

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option>Asia</option>
        <option>Europe</option>
        <option>Africa</option>
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

      <div style={{ height: "350px", overflowY: "scroll", border: "1px solid gray" }}>
        {Array.isArray(countries) &&
          countries.map((c) => (
            <div key={c.cca3}>
              <h4>{c.name.common}</h4>

              {showPopulation && (
                <p>Population: {c.population.toLocaleString()}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Countries;