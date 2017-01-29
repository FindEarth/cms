<script>
  export default {
    props:{
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
    img.image(:src='person.photos[0].data')
    div(style='padding: 14px;')
      span {{ person.name }}
      .bottom
        .address {{ person.geo.address }}

  .button-wrapper
    el-button(type='primary', @click='onSubmit')
      | Crear Persona
      i.el-icon-upload.el-icon-right

</template>

<style lang='scss' scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

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
