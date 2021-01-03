import React, { useState } from "react";
import People from "./Components/People";

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
    console.log(names);
    if (!names.includes(newName)) {
      console.log("button clicked", e.target);
      const nameObject = {
        name: newName.trim(),
        number: newNumber.trim(),
      };

      setPersons(persons.concat(nameObject));
      setNewName("");
      console.log(persons);
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
      <div>
        filter shown with{" "}
        <input value={filterValue} onChange={handleFilterValueChange} />
      </div>

      <form onSubmit={addName}>
        <h3>add a new contact</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People persons={FilteredPeople} />
    </div>
  );
};

export default App;
