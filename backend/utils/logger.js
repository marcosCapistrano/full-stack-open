/*
    Extracting logging to its own module is a good idea if we want to do something with the logs
    in the future
*/
export const info = (...params) => {
  if (process.env.NODE_ENV !== "test") console.log(...params);
};

export const error = (...params) => {
  if (process.env.NODE_ENV !== "test") console.error(...params);
};

export default {
  info,
  error,
};
