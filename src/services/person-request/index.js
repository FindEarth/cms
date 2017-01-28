import api   from 'services/api';
import toast from 'services/toast';

const personRequestService = {};

personRequestService.get = function(query = {}) {
  return api.get('/person-request', query)
  .then(response => response.data);
};

personRequestService.getTotalCount = function(id) {
  return api.get('/person-request', { approved: false })
  .then(response => response.data);
};

personRequestService.getById = function(id) {
  return api.get(`/person-request/${id}`)
  .then(response => response.data);
};

personRequestService.create = function(personRequest) {
  return api.post('/person-request', personRequest)
  .then(response => {
    toast.success('Solicitud de Persona creada correctamente');
    return response.data;
  });
};

personRequestService.update = function(personRequest) {
  return api.put(`/person-request/${personRequest._id}`, personRequest)
  .then(response => {
    toast.success('Solicitud de Persona actualizada correctamente');
    return response.data;
  });
};

personRequestService.remove = function(id) {
  return api.del(`/person-request/${id}`)
  .then(response => {
    toast.success('Solicitud de Persona borrada correctamente');
    return response.data;
  });
};

export default personRequestService;
