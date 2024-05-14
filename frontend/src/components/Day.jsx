const Day = ({ date, options, selectedOption, onOptionChange }) => {
  return (
    <div>
      <p>Are you avalible on {date}?</p>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={(e) => onOptionChange(e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Day;
