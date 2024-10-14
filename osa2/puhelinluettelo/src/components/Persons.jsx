const Persons = ({ persons, erasePerson }) => {
    return (
        <div>
        <ul>
            {persons.map(person => 
            <li key={person.id}>
                {person.name} {person.number} <button onClick={() => erasePerson(person.id)}>delete</button>
            </li>
            )}
        </ul>
        </div>
    )
    }

export default Persons