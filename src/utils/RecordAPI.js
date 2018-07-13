import axios from "axios";
export const api =
  process.env.REACT_APP_RECORDS_API_URL || "http://localhost:3000";

// es语法：`${api}/records`相当于api+'/records'
export const getAll = () => axios.get(`${api}/records`);

export const creat = body => axios.post(`${api}/records`, body);

export const update = (id, body) => axios.put(`${api}/records/${id}`, body);

export const remove = id => axios.delete(`${api}/records/${id}`);
