<script>
  import personService from 'services/person';

  export default {

    data() {
      return {
        person   : {},
        isLoading: true
      };
    },

    mounted() {
      this.isLoading = true;
      this.getPerson(this.$route.params.personId);
    },

    computed: {
      position() {
        const position = {
          lat: 0,
          lng: 0
        };
        if (!this.person.geo) { return position; }

        position.lat = this.person.geo.loc[1];
        position.lng = this.person.geo.loc[0];
        return position;
      }
    },

    methods: {
      getPerson(personId) {
        personService.getById(personId)
          .then((person) => {
            this.person    = person;
            this.isLoading = false;
          });
      }
    }
  };
</script>

<template lang='pug'>
  gmap-map.map(:center='position', :zoom='14', v-loading='isLoading')
    gmap-marker(
      :position='position',
      :clickable='true'
    )
</template>

<style lang="scss">
  .map {
    height: 200px;
    margin-bottom: 20px;
  }
</style>
