const Time = ({ time, database }) => {
  return (
    <div>
      <strong>{time}</strong>
      <br />
      There are{" "}
      {database[time].filter((thing) => thing["answer"] === "yes").length}{" "}
      people who said yes.
      <br />
      There are{" "}
      {database[time].filter((thing) => thing["answer"] === "no").length} people
      who said no.
      <br />
      There are{" "}
      {
        database[time].filter((thing) => thing["answer"] === "no answer").length
      }{" "}
      people who said no answer.
    </div>
  );
};
export default Time;
