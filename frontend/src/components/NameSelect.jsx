import { useState } from "react";

const NameSelect = ({ names, submitedName, setSubmitedName }) => {
  const [thisName, setThisName] = useState("");
  const handleNameDropChange = (event) => {
    setThisName(event.target.value);
  };
  const handleClick = (event) => {
    setSubmitedName(thisName);
  };
  return (
    <div>
      Select Name
      <select value={thisName} onChange={handleNameDropChange}>
        {names.map((name, index) => (
          <option value={name.name} key={name.id}>
            {name.name}
          </option>
        ))}
      </select>
      <button onClick={handleClick}> Enter </button>
    </div>
  );
};

export default NameSelect;
