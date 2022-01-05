import axios from 'axios';

export default axios.create({
  //baseURL: "https://scapes-merge-function.azurewebsites.net/api",
  // baseURL: "https://scapes-web-be-dev.azurewebsites.net/api/images",

  // baseURL: "https://scapes-web-api-dev-l.azurewebsites.net/api/images",
  //baseURL: "https://localhost:44324/api/images",

  //baseURL: "https://scapes-web-api-dev-l.azurewebsites.net/api/images",
  //baseURL: "https://localhost:44324/api/images",

  baseURL: 'https://scapes-api-management-dev.azure-api.net',

  headers: {
    'Content-type': 'application/json',
  },
});
