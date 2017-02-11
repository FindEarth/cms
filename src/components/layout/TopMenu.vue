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
    el-menu-item(index='1') Processing Center
    el-submenu(index='2')
      template(slot='title') Workspace
      el-menu-item(index='2-1') item one
      el-menu-item(index='2-2') item two
      el-menu-item(index='2-3') item three
</template>

<style lang='scss' scoped>
</style>
