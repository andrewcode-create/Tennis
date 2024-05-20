import { useState, useEffect, useRef } from "react";
import AnswerGroup from "./AnswerGroup";

const Time = ({ time, database }) => {
  const [showYes, setShowYes] = useState(false);
  const [showNo, setShowNo] = useState(false);
  const [showNA, setShowNA] = useState(false);

  return (
    <div>
      <strong>{time}</strong>
      <br />
      <AnswerGroup
        show={showYes}
        setShow={setShowYes}
        answer={"yes"}
        database={database}
        time={time}
      />
      <AnswerGroup
        show={showNo}
        setShow={setShowNo}
        answer={"no"}
        database={database}
        time={time}
      />
      <AnswerGroup
        show={showNA}
        setShow={setShowNA}
        answer={"no answer"}
        database={database}
        time={time}
      />
    </div>
  );
};
export default Time;
