import React from "react";

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
