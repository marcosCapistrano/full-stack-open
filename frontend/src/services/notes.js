import axios from "axios";

const baseURL = "/api/notes";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const req = await axios.get(baseURL);

  const nonExisting = {
    id: 10000,
    content: "this note is not saved on the server",
    important: true,
  };

  return req.data.concat(nonExisting);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseURL, newObject, config);
  return res.data;
};

const update = async (id, newObject) => {
  const req = await axios.put(`${baseURL}/${id}`, newObject);
  return req.data;
};

export default { getAll, create, update, setToken };
