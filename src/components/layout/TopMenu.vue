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
  el-menu.top-bar(
    theme='dark',
    default-active='1',
    mode='horizontal',
    @select='handleSelect'
  )
    el-row
      el-col.left-section(:span='4')
        p.logo Find Earth
      el-col.right-section(:span='20')
</template>

<style lang='scss' scoped>
@import "../../style/variables.scss";

  .top-bar {
    border-radius: 0;
    height: $header-height;
    background-color: $white;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    position: relative;
    z-index: 2;

    .left-section {
      background-color: $lightBlue;
      height: $header-height;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        &.logo {
          color: white;
          font-weight: 400;
          font-size: 23px;
        }
      }
    }
  }
</style>
