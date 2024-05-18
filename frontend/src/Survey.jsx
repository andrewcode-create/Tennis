import { useState, useEffect, useRef } from "react";
import Day from "./components/Day";
import NameSelect from "./components/NameSelect";
//import SearchBox from "./components/SearchBox";
//import PersonForm from "./components/PersonForm";
import tennisService from "./services/tennisService";
//import Form from "./components/Form";

const Survey = (props) => {
  //const [persons, setPersons] = useState([]);
  //const [newName, setNewName] = useState("");
  //const [newNumber, setNewNumber] = useState("");
  //const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState(null);
  const [dates, setDates] = useState(null);
  const [names, setNames] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitedName, setSubmitedName] = useState({});
  /*
  const dates = [["Monday 7:30"], ["Tuesday 7:30"], ["Friday 7:30"]];
  const names = [
    { name: "Amy", id: 0 },
    { name: "Ben", id: 1 },
    { name: "Claire", id: 2 },
    { name: "Nancy", id: 3 },
    { name: "Sofie", id: 4 },
    { name: "Travis", id: 5 },
  ];
  */
  const options = ["no answer", "yes", "no"];

  useEffect(() => {
    //get names
    tennisService.getNames().then((names) => {
      setNames(names);
    });

    //get dates
    tennisService.getTimes().then((dates) => {
      setDates(dates);

      //start everything with no answer
      /*
      let tmp = {};
      dates.forEach((date) => {
        tmp[date] = options[0];
      });
      setSelectedOptions(tmp);
      */
    });
  }, []);

  useEffect(() => {
    if (Object.entries(submitedName).length !== 0) {
      console.log(
        "getting options for person, name=",
        submitedName,
        "entries:",
        Object.entries(submitedName)
      );
      tennisService.getPerson(submitedName).then((result) => {
        setSelectedOptions(result);
      });
    }
  }, [submitedName]);
  console.log("start");

  const handleOptionChange = (date, option) => {
    console.log("old selected options:", selectedOptions);
    setSelectedOptions((prevSelectedOptions) => {
      const toret = {
        ...prevSelectedOptions,
        [date]: option,
      };
      console.log("new selected options:", toret);
      console.log("name of updated person:", submitedName, "option:", option);
      tennisService.updatePersonDay(submitedName, date, { [date]: option });
      return toret;
    });
  };

  if (dates === null || names === null) {
    return (
      <div>
        <h1>Please wait for server connection.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Bjorn's Tennis Sign up</h1>
      <p>
        Sign up for the days and times you are availible, then press submit.
      </p>
      <p>If you have any issues, email xxx@to-fill-in.com</p>
      {Object.entries(submitedName).length === 0 ? (
        <div>
          <NameSelect
            names={names}
            submitedName={submitedName}
            setSubmitedName={setSubmitedName}
          />
        </div>
      ) : (
        <div>
          {selectedOptions ? (
            dates.map((date) => (
              <Day
                date={date}
                key={date[0]}
                options={options}
                selectedOption={selectedOptions[date]}
                onOptionChange={(option) => handleOptionChange(date, option)}
              />
            ))
          ) : (
            <div>
              <h1>Please wait for server connection.</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );

  /*

<form onSubmit={submitForm}>
        <div>
          Name:{" "}
          {names.map((name, key) => {
            <div>
              <input type="radio" name="nameselect" id={key} />
              <label for={key}>{name}</label>
            </div>;
          })}
          Name: <input value={newName} onChange={setNewName} />
          <input type="radio" id="1" name="1" value="no" />
          <label for="1">No</label>
          <input type="radio" id="2" name="1" value="Yes" />
          <label for="2">Yes</label>
        </div>
      </form>










  useEffect(() => {
    console.log("getting the phonebook...");
    personService.getAll().then((people) => {
      console.log(`got initial ${people.length} people`);
      setPersons(people);
    });
  }, []);
  */

  const Notification = ({ message, style }) => {
    if (message === null) {
      return null;
    }
    return <div className={style}>{message}</div>;
  };

  /*
  const addName = (event) => {
    event.preventDefault();
    if (newName === "") {
      setNotification("Name field empty. Cannot be added to phonebook.");
      setNotificationStyle("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationStyle(null);
      }, 3500);
      return;
    }
    if (newNumber === "") {
      setNotification("Number field empty. Cannot be added to phonebook.");
      setNotificationStyle("error");
      setTimeout(() => {
        setNotification(null);
        setNotificationStyle(null);
      }, 3500);
      return;
    }
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Update number?`
        )
      ) {
        const oldPerson = persons.find((person) => person.name === newName);
        const newPerson = { ...oldPerson, number: newNumber };
        console.log(`updating ${oldPerson.name} with id ${oldPerson.id}`);
        personService
          .update(oldPerson.id, newPerson)
          .then((retPerson) => {
            console.log(
              `updated ${oldPerson.name}'s number to be ${retPerson.number}`
            );
            setNotification(`Successfully updated ${retPerson.name}.`);
            setNotificationStyle("good");
            setTimeout(() => {
              setNotification(null);
              setNotificationStyle(null);
            }, 3500);
            setPersons(
              persons.map((person) =>
                person.id === retPerson.id ? retPerson : person
              )
            );
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setNotification(`${error.response.data.error}`);
            setNotificationStyle("error");
            setTimeout(() => {
              setNotification(null);
              setNotificationStyle(null);
            }, 5000);
          });
      }
      return;
    }
    const obj = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };
    personService
      .create(obj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        console.log(
          `added ${returnedPerson.name} to server with number ${returnedPerson.number} and ID ${returnedPerson.id}`
        );
        console.log(returnedPerson);
        setNotification(`Successfully added ${returnedPerson.name}.`);
        setNotificationStyle("good");
        setTimeout(() => {
          setNotification(null);
          setNotificationStyle(null);
        }, 3500);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotification(`${error.response.data.error}`);
        setNotificationStyle("error");
        setTimeout(() => {
          setNotification(null);
          setNotificationStyle(null);
        }, 5000);
      });
  };
  */

  /*
  const deletePerson = (id) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${
          persons.find((person) => person.id === id).name
        }?`
      )
    ) {
      return;
    }
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id != id));
        console.log(`deleted ${id} from server`);
      })
      .catch(() => alert(`Could not delete note id ${id} from server`));
  };
  */
  /*
  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };
  */
  /*
  const handleSearchChange = (event) => {
    //console.log(event.target.value);
    setNewSearch(event.target.value);
  };
  */
  /*
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  */
  /*
  return (
    <div>
      <Notification message={notification} style={notificationStyle} />
      <h2>Phonebook</h2>
      Search: <SearchBox value={newSearch} onChange={handleSearchChange} />
      <PersonForm
        nameval={newName}
        handleNameChange={handleNameChange}
        numval={newNumber}
        handleNumberChange={handleNumberChange}
        onsubmit={addName}
      />
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        )
        .map((person) => (
          <Person
            person={person}
            deletePerson={() => deletePerson(person.id)}
            key={person.id}
          />
        ))}
    </div>
  );
  */
};
export default Survey;
