import React from "react";
import axios from "axios";

const CountriesList = ({ countries, setFilterValue }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name}>
          {country.name}{" "}
          <button
            onClick={() => {
              setFilterValue(country.name);
            }}
          >
            View Country
          </button>
        </p>
      ))}
    </div>
  );
};

export default CountriesList;
