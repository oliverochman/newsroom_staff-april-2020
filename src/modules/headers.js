const createHeaders = () => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  debugger;
  return {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };
};

export default createHeaders;
