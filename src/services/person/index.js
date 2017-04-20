import moment           from 'moment';
import { Notification } from 'element-ui';
import api              from 'services/api';

const personService = {};

personService.get = function(query = {}) {
  return api.get('/person', { params: query })
    .then(response => response.data);
};

personService.getFound = function(query = {}) {
  return api.get('/person/found', { params: query })
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

personService.share = function(person, source) {
  const url  = `https://find.earth/person/${person._id}`;
  const text = `${person.name} se perdió el ${moment(person.createdAt).format('DD/MM/YYYY')} en ` +
               `${person.geo.city}, ayúdanos a encontrarlo: ${url}`;

  const sources = {
    twitter : `https://twitter.com/intent/tweet?text=${encodeURI(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `whatsapp://send/?text=${encodeURI(text)}`
  };
  if (source === 'whatsapp') {
    window.location = sources[source];
    return;
  }
  window.open(sources[source]);
};

export default personService;
