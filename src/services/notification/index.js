import api   from 'services/api';
import toast from 'services/toast';

const notificationService = {};

notificationService.getAll = function(query = {}, organizationId) {
  return api.get(`/notification/organization/${organizationId}/notification-set`, query)
  .then(response => response.data);
};

notificationService.get = function(id) {
  return api.get(`/notification/${id}`)
  .then(response => response.data);
};

notificationService.create = function(notification, organizationId) {
  return api.post(`/notification/organization/${organizationId}/notification-set`, notification)
  .then(response => {
    toast.success('Notificacion creada correctamente');
    return response.data;
  });
};

export default notificationService;
