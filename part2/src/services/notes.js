import axios from "axios";

const baseURL = "http://localhost:3001/api/notes";

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
  const req = await axios.post(baseURL, newObject);
  return req.data;
};

const update = async (id, newObject) => {
  const req = await axios.put(`${baseURL}/${id}`, newObject);
  return req.data;
};

export default { getAll, create, update };
