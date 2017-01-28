/* global window */

import axios from 'axios';

import env   from 'services/env';
// import user  from 'services/user';
import toast from 'services/toast';

const api = {};

axios.defaults.baseURL = env.getApiUrl();
axios.defaults.timeout = 25000;


function errorHandler(err) {
  const res = err.response || err;
  if (!res.status) { return `Unknown Error: ${res}`; }

  switch (res.status) {
    case 400:
      return res.data || 'Error 400: Bad Request';
    case 401:
      // user.clearToken();
      window.location.href = '/login';
      if (res.data && res.data.errorDescription) {
        return res.data.errorDescription;
      }
      break;
    case 402:
      return 'Error 402: You must upgrade your account to do that';
    case 403:
      return 'Error 403: You are not authorized to access that';
    case 404:
      return 'Requested Resource Not Found';
    case 429:
      return 'Rate Limited';
    case 500: break;
    case 502: break;
    case 503:
      return `API Server Error ${res.status}`;
    default:
      return `API Request Error ${res.status}`;
  }
  return 'Unknown Error';
}

axios.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  // const idToken = user.getToken();
  // if (idToken) { config.headers.Authorization = `Bearer ${idToken}`; }
  return config;
}, error => console.log(error));

api.post = function(path, data, authenticate = true) {
  return axios
    .post(path, data)
    .then(res => res)
    .catch((err) => {
      const message = errorHandler(err);
      toast.error(message);
      throw (message);
    });
};

api.put = function(path, data, authenticate = true) {
  return axios
    .put(path, data)
    .then(res => res)
    .catch((err) => {
      const message = errorHandler(err);
      toast.error(message);
      throw (message);
    });
};

api.get = function(path, data, authenticate = true) {
  const query = { params: data };
  return axios
    .get(path, query)
    .then(res => res)
    .catch((err) => {
      const message = errorHandler(err);
      toast.error(message);
      throw (message);
    });
};

api.del = function(path, authenticate = true) {
  return axios
    .delete(path)
    .then(res => res)
    .catch((err) => {
      const message = errorHandler(err);
      toast.error(message);
      throw (message);
    });
};

export default api;
