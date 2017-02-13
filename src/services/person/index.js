import { Message } from 'element-ui';
import api         from 'services/api';

const personService = {};

personService.get = function(query = {}) {
  return api.get('/person', query)
    .then(response => response.data);
};

personService.getById = function(id) {
  return api.get(`/person/${id}`)
    .then(response => response.data);
};

personService.create = function(person) {
  return api.post('/person', person)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Persona creada correctamente'
      });
      return response.data;
    });
};

personService.update = function(person) {
  return api.put(`/person/${person._id}`, person)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Persona actualizada correctamente'
      });
      return response.data;
    });
};

personService.delete = function(id) {
  return api.delete(`/person/${id}`)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Persona eliminada correctamente'
      });
      return response.data;
    });
};

export default personService;
