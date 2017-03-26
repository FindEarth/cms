<script>
  import TopMenu  from 'components/layout/TopMenu';
  import LeftMenu from 'components/layout/LeftMenu';

  export default {
    name: 'MainContainer',

    components: { TopMenu, LeftMenu }

  };
</script>

<template lang='pug'>
  div
    top-menu

    el-row
      el-col(:span='4')
        .grid-content.bg-purple
          left-menu
      el-col.full-height(:span='20')
        .grid-content.bg-purple
          router-view
</template>

<style lang='scss' scoped>
  @import "../../style/variables.scss";

  .full-height {
    height: $layout-height;
    overflow-y: scroll;
    background-color: $background;
  }
</style>
