import React, { useState, useEffect } from "react";
import People from "./components/People";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    PersonService.getAll()
      .then((response) => setPersons(response.data))
      .catch((err) => console.log("something went wrong app useEffect ", err));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const names = [];
    const nameObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    persons.forEach((person) => names.push(person.name));

    if (newName === "") {
      return;
    }

    const existingPerson = persons.some(
      (person) => person.name === nameObject.name
    );
    if (existingPerson) {
      const newPerson = persons.find(
        (person) => person.name === nameObject.name
      );

      console.log(
        "existing person: ",
        existingPerson,
        "new Person: ",
        newPerson
      );
      const newDetails = { ...newPerson, newNumber };
      const { id } = newPerson;

      const confirmUpdate = window.confirm(
        `${newName} has already been added to phonebook, update number?`
      );

      if (confirmUpdate) {
        PersonService.update(id, newDetails).then((responsePerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : responsePerson
            )
          );
        });
      }
    }

    setPersons(persons.concat(nameObject));
    PersonService.addPerson(nameObject);
    setNewName("");
    setNewNumber("");
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

  const deletePerson = (id) => {
    const deleted = persons.find((person) => person.id === id);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${deleted.name}?`
    );
    if (confirmDelete) {
      PersonService.deletePerson(id).then(() => {
        const updatedList = persons.filter((person) => person.id !== id);
        setPersons(updatedList);
      });
    }
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
      <People persons={FilteredPeople} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
