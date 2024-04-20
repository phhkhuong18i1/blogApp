import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export default request;
