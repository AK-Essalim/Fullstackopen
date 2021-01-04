import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(typeof response);
      setCountries(response.data);
    });
  }, []);
  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [filterValue]);

  console.log("render", countries.length, "countries");

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div>
      find countries
      <input value={filterValue} onChange={handleFilterChange} />
      <Countries
        countries={filteredCountries}
        setFilterValue={setFilterValue}
        filterValue={filterValue}
      />
    </div>
  );
};

export default App;
