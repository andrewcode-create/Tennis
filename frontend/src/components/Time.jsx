import { useState, useEffect, useRef } from "react";

const Time = ({ time, database }) => {
  const [showYes, setShowYes] = useState(false);
  const [showNo, setShowNo] = useState(false);
  const [showNA, setShowNA] = useState(false);

  return (
    <div>
      <strong>{time}</strong>
      <br />
      <button onClick={() => setShowYes(!showYes)}>Toggle people</button> There
      are {database[time].filter((thing) => thing["answer"] === "yes").length}{" "}
      people who said yes.
      {showYes
        ? database[time]
            .filter((thing) => thing["answer"] === "yes")
            .map((thing) => <div key={thing.id}>{thing.name}</div>)
        : ""}
      <br />
      <button onClick={() => setShowNo(!showNo)}>Toggle people</button> There
      are {database[time].filter((thing) => thing["answer"] === "no").length}{" "}
      people who said no.
      {showNo
        ? database[time]
            .filter((thing) => thing["answer"] === "no")
            .map((thing) => <div key={thing.id}>{thing.name}</div>)
        : ""}
      <br />
      <button onClick={() => setShowNA(!showNA)}>Toggle people</button> There
      are{" "}
      {database[time].filter((thing) => thing["answer"] === "no answer").length}{" "}
      people who said no answer.
      {showNA
        ? database[time]
            .filter((thing) => thing["answer"] === "no answer")
            .map((thing) => <div key={thing.id}>{thing.name}</div>)
        : ""}
      <br />
    </div>
  );
};
export default Time;
