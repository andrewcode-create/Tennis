import { useState, useEffect, useRef } from "react";
import Day from "./components/Day";
import NameSelect from "./components/NameSelect";
import tennisService from "./services/tennisService";

const Survey = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState(null);
  const [dates, setDates] = useState(null);
  const [names, setNames] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitedName, setSubmitedName] = useState({});
  const options = ["no answer", "yes", "no"];

  useEffect(() => {
    //get names
    tennisService.getNames().then((names) => {
      setNames(names);
    });

    //get dates
    tennisService.getTimes().then((dates) => {
      setDates(dates);
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
