import {
  useEffect,
  useState
} from "react";

function Countries() {
  const [region, setRegion] =
    useState("Asia");

  const [countries, setCountries] =
    useState([]);

  const [showPopulation,
    setShowPopulation
  ] = useState(true);

  const [theme, setTheme] =
    useState("light");

  useEffect(() => {
    fetch(
      `https://restcountries.com/v3.1/region/${region}`
    )
      .then((res) => res.json())
      .then((data) =>
        setCountries(data)
      );
  }, [region]);

  return (
    <div>
      <h2>Countries</h2>

      <select
        value={region}
        onChange={(e) =>
          setRegion(e.target.value)
        }
      >
        <option>Asia</option>
        <option>Europe</option>
        <option>Africa</option>
      </select>

      <br />
      <br />

      <label>
        <input
          type="radio"
          value="light"
          checked={theme === "light"}
          onChange={(e) =>
            setTheme(
              e.target.value
            )
          }
        />
        Light
      </label>

      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === "dark"}
          onChange={(e) =>
            setTheme(
              e.target.value
            )
          }
        />
        Dark
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={showPopulation}
          onChange={() =>
            setShowPopulation(
              !showPopulation
            )
          }
        />
        Show Population
      </label>

      <div
        style={{
          height: "350px",
          overflowY: "scroll",
          border: "1px solid black",
          marginTop: "20px"
        }}
      >
        {countries.map(
          (country) => (
            <div
              key={country.cca3}
            >
              <h4>
                {
                  country.name
                    .common
                }
              </h4>

              {showPopulation && (
                <p>
                  Population:
                  {
                    country.population
                  }
                </p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Countries;