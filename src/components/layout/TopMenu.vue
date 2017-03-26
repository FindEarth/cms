<script>
  export default {
    data() {
      return {
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<template lang='pug'>
div
  el-menu.el-menu-demo(
    theme='dark',
    default-active='1',
    mode='horizontal',
    @select='handleSelect'
  )
    .logo
      img(src='/static/favicon.png')
      p.logo Find Earth
</template>

<style lang='scss' scoped>
  .logo {
    img {
      width: 35px;
      padding: 10px;
      vertical-align: middle;
    }

    p {
      display: inline-block;
      margin: 10px 0;
      vertical-align: middle;
      color: white;
    }
  }
</style>
