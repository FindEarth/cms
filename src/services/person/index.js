import { Notification } from 'element-ui';
import api         from 'services/api';

const personService = {};

personService.get = function(query = {}) {
  return api.get('/person', { params: query })
    .then(response => response.data);
};

personService.getById = function(id) {
  return api.get(`/person/${id}`)
    .then(response => response.data);
};

personService.create = function(person) {
  return api.post('/person', person)
    .then((response) => {
      Notification({
        message: 'Persona creada correctamente',
        type   : 'success'
      });
      return response.data;
    });
};

personService.update = function(person) {
  return api.put(`/person/${person._id}`, person)
    .then((response) => {
      Notification({
        message: 'Persona actualizada correctamente',
        type   : 'success'
      });
      return response.data;
    });
};

personService.delete = function(id) {
  return api.delete(`/person/${id}`)
    .then((response) => {
      Notification({
        message: 'Persona eliminada correctamente',
        type   : 'success'
      });
      return response.data;
    });
};

personService.share = function(person) {
  const text = `Ayudanos a encontrar a ${person.name} https://find.earth/person/${person._id} @FindEarth`;
  window.open(
    `https://twitter.com/intent/tweet?text=${text}`,
    'share-person',
    'height=400,width=650'
  );
};

export default personService;
