<script>
  export default {
    props: {
      isEdit: {
        type   : Boolean,
        default: false
      },
      person: {
        type    : Object,
        required: true
      }
    },

    methods: {
      onSubmit() {
        this.$emit('resume-submitted');
      }
    }
  };
</script>

<template lang='pug'>
  .container
    el-card(:body-style='{ padding: "0px" }')
      el-carousel(v-if='person.photos')
        el-carousel-item(v-for='photo in person.photos')
          img.image(v-bind:src='photo.data || photo.url')
      div(style='padding: 14px;')
        span {{ person.name }}
        .bottom
          .address {{ person.geo.address }}

    el-button-group.button-wrapper
      el-button(type='primary', @click="$emit('step-back')") Atras
      el-button(type='primary', @click='onSubmit')
        | {{ isEdit ? 'Guardar' : 'Crear Persona' }}
        i.el-icon-upload.el-icon-right
</template>

<style lang='scss' scoped>
  .address {
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

  .button-wrapper {
    margin-top: 40px;
  }

  .el-icon-upload {
    margin-left: 10px;
  }
</style>
