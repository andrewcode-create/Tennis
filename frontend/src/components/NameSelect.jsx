import { useState, useEffect } from "react";

const NameSelect = ({ names, submitedName, setSubmitedName }) => {
  const [selectedNameId, setSelectedNameId] = useState("");
  useEffect(() => {
    if (names.length > 0) {
      setSelectedNameId(names[0].id);
    }
  }, [names]);

  const handleNameDropChange = (event) => {
    setSelectedNameId(event.target.value);
  };

  const handleClick = (event) => {
    const selectedName = names.find((name) => name.id === selectedNameId);
    console.log(
      "handle click on submit button for name, setting submited name to",
      selectedName
    );
    setSubmitedName(selectedName);
  };

  return (
    <div>
      Select Name
      <select value={selectedNameId} onChange={handleNameDropChange}>
        {names.map((name, index) => (
          <option value={name.id} key={name.id}>
            {name.name}
          </option>
        ))}
      </select>
      <button onClick={handleClick}> Enter </button>
    </div>
  );
};

export default NameSelect;
