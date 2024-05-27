import axios from "axios";
const baseUrl = "/api/new";

const printR = (thing, message) => {
  console.log(message, JSON.stringify(thing, null, 2));
  return thing;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => printR(response.data, "getALL"));
};

const getNames = () => {
  const request = axios.get(`${baseUrl}/names`);
  return request.then((response) => printR(response.data, "getNames"));
};

const getTimes = () => {
  const request = axios.get(`${baseUrl}/times`);
  return request.then((response) => printR(response.data, "getTimes"));
};

const getPerson = (name) => {
  const request = axios.get(`${baseUrl}/name/${name.id}`);
  return request.then((response) => printR(response.data, "getPerson"));
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
