import { Message } from 'element-ui';
import api         from 'services/api';

const personRequestService = {};

personRequestService.get = function(query = {}) {
  return api.get('/person-request', { params: query })
    .then(response => response.data);
};

personRequestService.getTotalCount = function(id) {
  return api.get('/person-request', { params: { approved: false } })
    .then(response => response.data);
};

personRequestService.getById = function(id) {
  return api.get(`/person-request/${id}`)
    .then(response => response.data);
};

personRequestService.create = function(personRequest) {
  return api.post('/person-request', personRequest)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Pedido de carga de persona creado correctamente'
      });
      return response.data;
    });
};

personRequestService.update = function(personRequest) {
  return api.put(`/person-request/${personRequest._id}`, personRequest)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Pedido de carga de persona actualizado correctamente'
      });
      return response.data;
    });
};

personRequestService.delete = function(id) {
  return api.del(`/person-request/${id}`)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Pedido de carga de persona borrado correctamente'
      });
      return response.data;
    });
};

export default personRequestService;
