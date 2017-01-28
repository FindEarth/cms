import api   from 'services/api';
import DB    from 'services/db';
import toast from 'services/toast';


const userService = {};

let idToken = null;

const setToken = token => {
  idToken = token;
  DB.set('token', token);
};

const loginSuccess = response => {
  setToken(response.data.idToken);
};

const loginFailed  = response => {
  throw (response);
};

userService.authenticate = function(username, password) {
  return api.post('/auth', { username, password })
  .then(loginSuccess)
  .catch(loginFailed);
};

userService.getCurrentUser = function() {
  return api.get('/user-profile/', { type: 'cms' })
  .then(response => response.data);
};

userService.updateUser = function(user) {
  return api.put(`user/${user.sub}`, user)
  .then(response => {
    toast.success('Usuario actualizado correctamente');
    return response.data;
  });
};

userService.getToken = function() {
  return idToken || DB.get('token');
};

userService.clearToken = function() {
  idToken = null;
  DB.remove('token');
};

export default userService;
