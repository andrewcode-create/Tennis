const PersonForm = ({
  nameval,
  handleNameChange,
  numval,
  handleNumberChange,
  onsubmit,
}) => {
  return (
    <form onSubmit={onsubmit}>
      <div>
        Name: <input value={nameval} onChange={handleNameChange} />
        <br />
        Number: <input value={numval} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
