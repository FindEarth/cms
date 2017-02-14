<script>
  import personService from 'services/person';

  export default {
    components: {},

    data() {
      return {
        people   : [],
        isLoading: false
      };
    },

    mounted() {
      this.getPeople();
    },

    methods: {
      getPeople() {
        this.isLoading = true;
        personService.get({ isMissing: false })
          .then((people) => {
            this.people    = people;
            console.log(this.people);
            this.isLoading = false;
          });
      },

      deletePerson(index, person) {
        const message = `Esta operacion borrara la persona ${person.name} ` +
                        'permanentemente, Desea continuar?';
        this.$confirm(message, 'Eliminar Persona', {
          confirmButtonText: 'OK',
          cancelButtonText : 'Cancel',
          type             : 'warning'
        })
        .then(() => personService.delete(person._id))
        .then(() => {
          this.people.splice(index, 1);
        });
      },

      sharePerson(person) {
        const text = `${person.name} ha sido encontrado el el ${person.createdAt}, ` +
                     'gracias por difundir!';
        window.open(
          `https://twitter.com/intent/tweet?text=${text}`,
          'share-person',
          'height=400,width=650'
        );
      }
    }
  };
</script>

<template lang='pug'>
div
  el-table(
    :data='people',
    border='',
    style='width: 100%',
    v-loading='isLoading',
    element-loading-text='Cargando personas',
    empty-text='No se ha encontrado personas'
  )
    el-table-column(fixed='', prop='name', label='Nombre', width='200')
    el-table-column(prop='age', label='Edad', width='90')
    el-table-column(prop='gender', label='Genero', width='90')
    el-table-column(prop='geo.city', label='Ciudad', width='220')
    el-table-column(prop='geo.countryCode', label='Pais', width='70')
    el-table-column(prop='geo.postalCode', label='Zip', width='80')
    el-table-column(prop='createdAt', label='Fecha', width='210')
    el-table-column(fixed='right', label='Operations', width='120')
      template(scope='scope')
        el-button-group
          el-button(type='primary', size='mini', icon='edit')
          el-button(
            type='primary',
            size='mini',
            icon='share',
            @click.native.stop='sharePerson(scope.row)'
          )
          el-button(
            type='primary',
            size='mini',
            icon='delete',
            @click.native.prevent='deletePerson(scope.$index, scope.row)'
          )
</template>

<style lang="scss">
</style>
