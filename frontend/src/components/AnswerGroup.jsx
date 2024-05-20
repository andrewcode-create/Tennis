const AnswerGroup = ({ show, setShow, answer, database, time }) => {
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>{" "}
      There are{" "}
      {database[time].filter((thing) => thing["answer"] === answer).length}{" "}
      people who said {answer}.
      {show
        ? database[time]
            .filter((thing) => thing["answer"] === answer)
            .map((thing) => <div key={thing.id}>{thing.name}</div>)
        : ""}
    </div>
  );
};
export default AnswerGroup;
