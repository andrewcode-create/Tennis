import { useState, useEffect, useRef } from "react";
import tennisService from "./services/tennisService";
import { json } from "react-router-dom";

const Info = (props) => {
  const [rawDatabase, setRawDatabase] = useState({});
  const [database, setDatabase] = useState({});
  const [times, setTimes] = useState([]);
  const [names, setNames] = useState({});

  useEffect(() => {
    tennisService.getAll().then((newDatabase) => {
      setRawDatabase(newDatabase);
      console.log("got database", JSON.stringify(newDatabase));
    });
  }, []);

  useEffect(() => {
    if (!rawDatabase || Object.keys(rawDatabase).length === 0) return;

    const { times, names, responses } = rawDatabase;
    var newDatabase = {};

    Object.keys(responses).forEach((personID) => {
      Object.entries(responses[personID]).forEach(([time, answer]) => {
        if (!newDatabase[time]) {
          newDatabase[time] = [];
        }
        newDatabase[time].push({
          name: names[personID].name,
          id: personID,
          answer: answer,
        });
      });
    });

    console.log("database:", newDatabase);
    console.log("times:", times);
    console.log("names:", names);
    setTimes(rawDatabase["times"]);
    setNames(rawDatabase["names"]);
    setDatabase(newDatabase);
  }, [rawDatabase]);

  if (Object.keys(rawDatabase).length === 0) {
    return (
      <div>
        <h1>Please wait for server connection</h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Info</h2>
      <div>
        {times.map((time, index) => (
          <div key={index}>
            <strong>{time}</strong>
            <br />
            There are{" "}
            {
              database[time].filter((thing) => thing["answer"] === "yes").length
            }{" "}
            people who said yes.
            <br />
            There are{" "}
            {
              database[time].filter((thing) => thing["answer"] === "no").length
            }{" "}
            people who said no.
            <br />
            There are{" "}
            {
              database[time].filter((thing) => thing["answer"] === "no answer")
                .length
            }{" "}
            people who said no answer.
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
