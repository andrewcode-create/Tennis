import { useState, useEffect, useRef } from "react";
import tennisService from "./services/tennisService";
import { json } from "react-router-dom";
import Time from "./components/Time";

const Info = (props) => {
  const [responses, setResponses] = useState({});
  const [times, setTimes] = useState([]);
  const [names, setNames] = useState({});
  const server = useRef({
    responses: false,
    times: false,
    names: false,
  });
  const [doneServer, setDoneServer] = useState(false);
  const checkServer = (server, setDoneServer) => {
    if (
      server.current.responses &&
      server.current.times &&
      server.current.names
    ) {
      setDoneServer(true);
    }
  };

  useEffect(() => {
    tennisService.getAll().then((newDatabase) => {
      checkServer();
      setResponses(newDatabase);
    });
    tennisService.getTimes().then((newDatabase) => {
      checkServer();
      setTimes(newDatabase);
    });
    tennisService.getNames().then((newDatabase) => {
      checkServer();
      setNames(newDatabase);
    });
  }, []);

  /*
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
*/

  return (
    <div>
      <h2>Info</h2>
      {times.map((time, index) => (
        <div key={index}>
          <Time database={database} time={time} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Info;
