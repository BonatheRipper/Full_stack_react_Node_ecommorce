export const GetError = (error) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};
export const GetSuccess = (data) => {
  return data.message && data.response.data.message
    ? data.response.data.message
    : data.message;
};
