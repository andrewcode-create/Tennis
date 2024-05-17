import { useState } from "react";

const NameSelect = ({ names, submitedName, setSubmitedName }) => {
  const [thisName, setThisName] = useState("");
  const handleNameDropChange = (event) => {
    setThisName(event.target.value);
  };
  return (
    <label>
      Select Name{" "}
      <select value={thisName} onChange={handleNameDropChange}>
        {names.map((name, index) => (
          <option value={name} key={index}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default NameSelect;
