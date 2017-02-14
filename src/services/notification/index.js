import { Message } from 'element-ui';
import api         from 'services/api';

const notificationService = {};

notificationService.getAll = function(query = {}, organizationId) {
  return api.get(`/notification/organization/${organizationId}/notification-set`, { params: { query } })
    .then(response => response.data);
};

notificationService.get = function(id) {
  return api.get(`/notification/${id}`)
    .then(response => response.data);
};

notificationService.create = function(notification, organizationId) {
  return api.post(`/notification/organization/${organizationId}/notification-set`, notification)
    .then((response) => {
      Message({
        showClose: true,
        message  : 'Notificacion creada correctamente'
      });
      return response.data;
    });
};

export default notificationService;
