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
  div
    gmap-map.map(:center='position', :zoom='14', v-loading='isLoading')
      gmap-marker(
        :position='position',
        :clickable='true'
      )

    el-row()
      el-col(:span='7', :offset='1')
        .grid-content.bg-purple
          el-card(:body-style="{ padding: '0px' }")
            img.image(src='https://avatars1.githubusercontent.com/u/6719053?v=3&s=460')
            div(style='padding: 14px;')
              span {{ person.name }}
              .bottom.clearfix
                time.time {{ person.createdAt }}

      el-col(:span='16')
        .grid-content.bg-purple

</template>

<style lang="scss">
  .map {
    height: 200px;
    margin-bottom: 20px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
