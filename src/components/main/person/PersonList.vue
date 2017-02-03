<script>
  import personService from 'services/person';

  export default {
    components: {},

    data() {
      return {
        people: []
      };
    },

    mounted() {
      this.getPeople();
    },

    methods: {
      getPeople() {
        personService.get()
          .then((people) => {
            this.people = people;
          });
      }
    }
  };
</script>

<template lang='pug'>
div
  el-table(:data='people', border='', style='width: 100%')
    el-table-column(fixed='', prop='name', label='Nombre', width='200')
    el-table-column(prop='age', label='Edad', width='90')
    el-table-column(prop='gender', label='Genero', width='90')
    el-table-column(prop='geo.city', label='Ciudad', width='220')
    el-table-column(prop='geo.countryCode', label='Pais', width='70')
    el-table-column(prop='geo.postalCode', label='Zip', width='80')
    el-table-column(prop='createdAt', label='Fecha', width='210')
    el-table-column(fixed='right', label='Operations', width='120')
      template(scope='scope')
        router-link(:to="{ name: 'person-detail', params: { personId: scope.row._id }}")
          i.el-icon-information
        el-button(@click.native.prevent='deleteRow(scope.$index, tableData4)', type='text', size='small')
          i.el-icon-delete
</template>

<style lang="scss">
</style>
