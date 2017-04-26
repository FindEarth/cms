<script>
  import moment from 'moment'

  import userService from 'services/user'
  import personService from 'services/person'

  export default {
    components: {},

    data () {
      return {
        people: [],
        isLoading: false
      }
    },

    mounted () {
      this.getPeople()
    },

    methods: {
      getPeople () {
        this.isLoading = true
        personService.getByOrganization(userService.get().organization)
          .then((people) => {
            this.people = people
            this.isLoading = false
          })
      },

      onSelect (person) {
        this.$router.push({
          name: 'person-detail',
          params: { personId: person._id }
        })
      },

      deletePerson (index, person) {
        const message = `Esta operacion borrara la persona ${person.name} ` +
                        'permanentemente, Desea continuar?'
        this.$confirm(message, 'Eliminar Persona', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => personService.delete(person._id))
        .then(() => this.people.splice(index, 1))
      },

      sharePerson (person) {
        personService.share(person)
      },

      editPerson (person) {
        this.$router.push({
          name: 'person-edit',
          params: { personId: person._id }
        })
      }
    },

    filters: {
      date (date) {
        return moment(date).format('D MMMM YYYY')
      }
    }
  }
</script>

<template lang='pug'>
  el-table(
    :data='people',
    v-on:row-click='onSelect',
    border='',
    style='width: 100%',
    v-loading='isLoading',
    element-loading-text='Cargando personas',
    empty-text='No se ha encontrado personas'
  )
    el-table-column(fixed='', prop='name', label='Nombre', width='200', class-name='pointer')
    el-table-column(prop='age', label='Edad', width='90', class-name='pointer')
    el-table-column(prop='gender', label='Genero', width='90', class-name='pointer')
    el-table-column(prop='geo.city', label='Ciudad', width='260', class-name='pointer')
    el-table-column(prop='geo.countryCode', label='Pais', width='70', class-name='pointer')
    el-table-column(prop='geo.postalCode', label='Zip', width='80', class-name='pointer')
    el-table-column(prop='lastSeenAt', label='Ultimo avistamiento', width='180', class-name='pointer')
      template(scope='scope')
        span {{ scope.row.lastSeenAt | date }}
    el-table-column(prop='createdAt', label='Fecha de Creación', width='180', class-name='pointer')
      template(scope='scope')
        span {{ scope.row.createdAt | date }}
    el-table-column(fixed='right', label='Acciones', width='120')
      template(scope='scope')
          el-button-group
            el-button(
              type='primary',
              size='mini',
              icon='edit',
              @click.native.stop='editPerson(scope.row)'
            )
            //- el-button(
            //-   type='primary',
            //-   size='mini',
            //-   icon='share',
            //-   @click.native.stop='sharePerson(scope.row)'
            //- )
            el-button(
              type='primary',
              size='mini',
              icon='delete',
              @click.native.stop='deletePerson(scope.$index, scope.row)'
            )
</template>
