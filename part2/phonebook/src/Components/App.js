import React, { useState } from 'react'

const Title = ({ title }) => 
   <h2>{title}</h2>

const Person = (props) =>
   <div>{props.name} {props.number}</div>

const Persons = ({ persons }) =>
   persons.map(person =>
      <Person
         key={person.name}
         name={person.name}
         number={person.number} />
   )

const Filter = (props) =>
   <div>
      Filter shown with
      <input
         onChange={props.handleFindChange}
         value={props.search} />
   </div>

const PersonForm = (props) => {
   const { nameChange, phoneChange, formSubmit, name, number } = props;
   return (
      <form onSubmit={formSubmit}>
         <div>
            Name: <input onChange={nameChange} value={name} />
         </div>
         <div>
            Number: <input onChange={phoneChange} value={number} />
         </div>
         <div>
            <button type="submit">Add</button>
         </div>
      </form>
   );
}

const App = () => {
   const [persons, setPersons] = useState([
      { name: "Erick Oliveira", number: '000000000000' },
   ]);
   const [newName, setNewName] = useState('');
   const [newNumber, setNewNumber] = useState('');
   const [search, setSearch] = useState('');

   const handleFindChange = (event) =>
      setSearch(event.target.value);

   const personsToShow = search === '' ? persons :
      persons.filter(person =>
         person.name.toLowerCase()
         .includes(search.toLowerCase()));

   const handleNameChange = (event) =>
      setNewName(event.target.value);

   const handlePhoneChange = (event) =>
      setNewNumber(event.target.value);

   const handleFormSubmit = (event) => {
      event.preventDefault();
      persons.find(person => person.name === newName)
         ? alert(`${newName} is already added to phonebook`)
         : setPersons(persons.concat({
            name: newName,
            number: newNumber,
         }));
      setNewName('');
      setNewNumber('');
   }

   return (
      <div>
         <Title title='Phonebook' />
         <Filter handleFindChange={handleFindChange}
            search={search} />
         <Title title='Add a new' />
         <PersonForm nameChange={handleNameChange}
            phoneChange={handlePhoneChange}
            formSubmit={handleFormSubmit}
            name={newName}
            number={newNumber} />
         <Title title="Numbers" />
         <Persons persons={personsToShow} />
      </div>
   )
}

export default App;