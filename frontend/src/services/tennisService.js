import axios from "axios";
const baseUrl = "/api";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getPerson = (name) => {
  const request = axios.get(`${baseUrl}/${name.id}`);
  return request.then((response) => response.data);
};

const updatePerson = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name.id}`, newObject);
  return request.then((response) => response.data);
};

const updatePersonDay = (name, date, newObject) => {
  const request = axios.put(`${baseUrl}/${name.id}/${date}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, getPerson, updatePerson, updatePersonDay };
