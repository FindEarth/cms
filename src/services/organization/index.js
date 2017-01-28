import api   from 'services/api';
import toast from 'services/toast';

const organizationService = {};

organizationService.getOrganizations = function(query = {}) {
  return api.get('/organization', query)
  .then(response => response.data);
};

organizationService.get = function(id) {
  return api.get(`/organization/${id}`)
  .then(response => response.data);
};


organizationService.update = function(organization) {
  return api.put(`/organization/${organization._id}`, organization)
  .then(response => {
    toast.success('Organizacion actualizada correctamente');
    return response.data;
  });
};

export default organizationService;
