import trae        from 'trae';
import environment from 'services/environment';
import user        from 'services/user';
import { Message } from 'element-ui';

environment.init([{
  name      : 'local',
  url       : 'http://localhost:9090',
  startsWith: 'http://localhost'
}, {
  name      : 'qa',
  url       : 'https://qa-api.find.earth',
  startsWith: 'https://qa-admin'
}, {
  name      : 'prod',
  url       : 'https://api.find.earth',
  startsWith: 'https://admin'
}]);

function errorMessage(err) {
  switch (err.status) {
    case 400:
      return err.message || 'Error 400: Bad Request';
    case 401:
      user.clearToken();
      window.location.href = '/login';
      return err.message;
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
      return `API Server Error ${err.status}`;
    default:
      return `API Request Error ${err.status}`;
  }
  return 'Unknown Error';
}

function tokenize(config) {
  const token = user.getToken().value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function throwError(err) {
  const msg = errorMessage(err);
  Message({
    showClose: true,
    message  : msg,
    type     : 'error'
  });
  throw msg;
}

function identity(res) {
  return res;
}

const api = trae.create({
  baseUrl: environment.getUrl()
});

api.before(tokenize);
api.after(identity, throwError);

export default api;
