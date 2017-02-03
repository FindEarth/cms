<script>
  import personRequestService from 'services/person-request';

  export default {
    components: {},

    data() {
      return {
        personRequests: []
      };
    },

    mounted() {
      this.getPersonRequests();
    },

    methods: {
      getPersonRequests(query = {}) {
        const q = Object.assign({}, query);
        return personRequestService.get(q)
        .then( (personRequests) => {
          this.personRequests = personRequests;
        });
      }
    }
  };
</script>

<template lang='pug'>
div
  el-table(:data='personRequests', border='', style='width: 100%')
    el-table-column(fixed='', prop='name', label='Nombre')
    el-table-column(prop='age', label='Edad')
    el-table-column(prop='geo.city', label='Ciudad')
    el-table-column(prop='lastSeenAt', label='Ultima vez visto')
    el-table-column(prop='createdAt', label='Fecha')
    el-table-column(fixed='right', label='Operations')
      template(scope='scope')
        router-link(:to="{ name: 'person-detail', params: { personId: scope.row._id }}")
          i.el-icon-information
        el-button(@click.native.prevent='deleteRow(scope.$index, tableData4)', type='text', size='small')
          i.el-icon-delete
</template>

<style lang="scss">
</style>
