import axios from "axios";
const baseUrl = "/api";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getNames = () => {
  const request = axios.get(`${baseUrl}/names`);
  return request.then((response) => response.data);
};

const getTimes = () => {
  const request = axios.get(`${baseUrl}/times`);
  return request.then((response) => response.data);
};

const getPerson = (name) => {
  const request = axios.get(`${baseUrl}/name/${name.id}`);
  return request.then((response) => response.data);
};

const updatePerson = (name, newObject) => {
  const request = axios.put(`${baseUrl}/${name.id}`, newObject);
  return request.then((response) => response.data);
};

const updatePersonDay = (name, date, newObject) => {
  console.log(
    "UPDATING PERSON! Name is",
    name,
    ", Id is",
    name.id,
    ", option is",
    newObject
  );
  const request = axios.put(`${baseUrl}/${name.id}/${date}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getPerson,
  updatePerson,
  updatePersonDay,
  getNames,
  getTimes,
};
