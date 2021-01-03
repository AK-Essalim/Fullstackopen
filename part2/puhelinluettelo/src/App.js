import React, { useState, useEffect } from "react";
import People from "./Components/People";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch((err) => console.log("something went wrong ", err));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const names = [];
    persons.forEach((person) => names.push(person.name));
    if (!names.includes(newName)) {
      console.log("button clicked", e.target);
      const nameObject = {
        name: newName.trim(),
        number: newNumber.trim(),
      };

      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added in the phonebook`);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const FilteredPeople = persons.filter((people) =>
    people.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <Filter
        handleFilterValueChange={handleFilterValueChange}
        filterValue={filterValue}
      />

      <h3>add a new contact</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <People persons={FilteredPeople} />
    </div>
  );
};

export default App;
