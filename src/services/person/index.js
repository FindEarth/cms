import api   from 'services/api';
import toast from 'services/toast';

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
      toast.success('Persona creada correctamente');
      return response.data;
    });
};

personService.update = function(person) {
  return api.put(`/person/${person._id}`, person)
    .then((response) => {
      toast.success('Persona actualizada correctamente');
      return response.data;
    });
};

personService.delete = function(id) {
  return api.del(`/person/${id}`)
    .then((response) => {
      toast.success('Persona borrada correctamente');
      return response.data;
    });
};

export default personService;
