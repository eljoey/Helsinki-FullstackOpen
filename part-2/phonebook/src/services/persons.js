import axios from 'axios';

const apiURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(apiURL);
  return request.then(res => res.data);
};

const create = newObj => {
  const request = axios.post(apiURL, newObj);
  return request.then(res => res.data);
};

const edit = (id, newObj) => {
  const request = axios.put(`${apiURL}/${id}`, newObj);
  return request.then(res => res.data);
};

const delObj = id => {
  const request = axios.delete(`${apiURL}/${id}`);
  return request.then(res => res.data);
};

export default {
  getAll,
  create,
  edit,
  delObj
};
