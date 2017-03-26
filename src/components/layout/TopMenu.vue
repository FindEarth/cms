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
        img.logo-img(src='/static/logo.svg')
        p.logo-text Find Earth
      el-col.right-section(:span='20')
        el-dropdown
          el-button
            i.fa.fa-user-circle-o.fa-2x(aria-hidden="true")
            span.name
              | Jonatan del valle
              i.el-icon-caret-bottom.el-icon--right
          el-dropdown-menu(slot='dropdown')
            el-dropdown-item Perfil
            el-dropdown-item Información
            el-dropdown-item Salir
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
      padding: 15px;

      p {
        &.logo-text {
          color: white;
          font-weight: 400;
          font-size: 18px;
        }
      }

      .logo-img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }

    .right-section {
      display: flex;
      height: $header-height;
      align-items: center;
      justify-content: flex-end;
      flex-direction: row;
      padding: 0 15px;

      button {
        border: none;
        color: $dark-grey;

        &:hover {
          color: $lightBlue;
        }

        .name {
          position: relative;
          bottom: 4px;
        }
      }
    }
  }
</style>
