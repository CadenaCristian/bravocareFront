import axios from "axios";

const baseUrl = "http://localhost:3001";

export const fetchApi = async (endpoint, method, data) => {
  const url = `${baseUrl}/${endpoint}`;
  console.log("url: ", url);
  const resp = await axios(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  });
  console.log("RESPUESTA API: ", resp);
  return resp;
};
