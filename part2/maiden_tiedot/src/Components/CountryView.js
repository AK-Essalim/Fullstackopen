import React, { useEffect, useState } from "react";
import Weather from "./Weather";

const CountryView = ({ country, countriesLength }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <h3>Capital {country.capital}</h3>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} width="150" alt=""></img>
      <Weather city={country.capital} country={countriesLength} />
    </div>
  );
};

export default CountryView;
