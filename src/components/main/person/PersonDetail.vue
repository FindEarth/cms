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
  p person: {{ person.name }}
</template>

<style lang="scss">
</style>
