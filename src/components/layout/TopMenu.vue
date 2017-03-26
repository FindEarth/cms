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
    p.logo Find Earth
</template>

<style lang='scss' scoped>
  p.logo {
    color: white;
    margin-left: 20px;
  }
</style>
