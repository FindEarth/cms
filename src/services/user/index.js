import { Message } from 'element-ui';
import api         from 'services/api';
import store       from 'store';


const userService = {};

userService.authenticate = function(username, password) {
  return api.post('/auth', { username, password })
    .then((res) => {
      store.set('token', res.data.idToken);
    });
};

userService.getCurrentUser = function() {
  return api.get('/user-profile', { type: 'cms' })
    .then(response => response.data);
};

userService.updateUser = function(user) {
  return api.put(`user/${user.sub}`, user)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Usuario actualizado correctamente'
      });
      return response.data;
    });
};

userService.getToken = function() {
  return store.get('token');
};

userService.clearToken = function() {
  store.remove('token');
};

export default userService;
