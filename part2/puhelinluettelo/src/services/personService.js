import React from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addPerson = (nameObject) => {
  axios
    .post(baseUrl, nameObject)
    .catch((err) => console.log("something went wrong in addPerson", err));
};
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  addPerson,
  deletePerson,
  update,
};
