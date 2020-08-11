import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";

import InfoBox from "./componets/InfoBox";
import Map from "./componets/Map";

import "./App.css";

function App() {
  const [countires, setCountries] = useState([]);
  const [country, setCountry] = useState();

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const counries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(counries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const contryCode = event.target.value;
    setCountry(contryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwid">WorldWide</MenuItem>
              {countires.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={12345} total={2000} />
          <InfoBox title="Recovered" cases={12345} total={3000} />
          <InfoBox title="Deaths" cases={12345} total={4000} />
        </div>
        <Map />
      </div>
      <Card className="app__rigth">
        <CardContent>
          <h3>Live Cases by Country</h3>

          <h3>Worldwide new cases</h3>
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
