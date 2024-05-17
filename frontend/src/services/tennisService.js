import axios from "axios";
const baseUrl = "/api";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getPerson = (name) => {
  const request = axios.get(`${baseUrl}/${name}`);
  return request.then((response) => response.data);
};

const updatePerson = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name}`, newObject);
  return request.then((response) => response.data);
};

const updatePersonDay = (name, date, newObject) => {
  const request = axios.put(`${baseUrl}/${name}/${date}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, getPerson, updatePerson, updatePersonDay };
