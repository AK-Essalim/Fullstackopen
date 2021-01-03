import React, { useState } from "react";
import People from "./Components/People";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
