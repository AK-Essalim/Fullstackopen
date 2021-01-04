import React from "react";

const App = ({ countries, setFilterValue }) => {
  if (countries.length > 1 && countries.length < 11) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name}>
            {country.name}
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
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <h3>Capital {countries[0].capital}</h3>
        <p>Population {countries[0].population}</p>
        <h3>Languages</h3>
        <ul>
          {countries[0].languages.map((language) => {
            return <li key={language.name}>{language.name}</li>;
          })}
        </ul>
        <img src={countries[0].flag} width="150" alt=""></img>
      </div>
    );
  } else {
    return <p></p>;
  }
};

export default App;
