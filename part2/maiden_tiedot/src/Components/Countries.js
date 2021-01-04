import React from "react";
import axios from "axios";
import Weather from "./Weather";
import CountriesList from "./CountriesList";
import CountryView from "./CountryView";

const Countries = ({ countries, setFilterValue }) => {
  if (countries.length > 1 && countries.length < 11) {
    return (
      <div>
        <CountriesList countries={countries} setFilterValue={setFilterValue} />
      </div>
    );
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <>
        <CountryView
          country={countries[0]}
          countriesLength={countries.length}
        />
      </>
    );
  }
  return null;
};

export default Countries;
