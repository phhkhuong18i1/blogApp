import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export const deleteItem = async (path, option = {}) => {
  const response = await request.delete(path, option);
  return response.data;
};


export default request;
