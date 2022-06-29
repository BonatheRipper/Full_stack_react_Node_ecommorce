export const GetError = (error) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};
