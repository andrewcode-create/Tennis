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
          <button onClick={() => setSubmitedName({})}>
            Go back to name select
          </button>{" "}
          Hello <strong>{submitedName.name}</strong>!
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
};
export default Survey;
