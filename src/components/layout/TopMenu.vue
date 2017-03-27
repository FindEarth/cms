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
        img.img-gravatar(src="http://cdn.wpbeginner.com/wp-content/uploads/2012/08/gravatarlogo.jpg")
        el-submenu
          template(slot='title') Juan Andres Juanjo
          el-menu-item(index='2-1')
            i.fa.fa-user(aria-hidden='true')
            | Perfil
          el-menu-item(index='2-2')
            i.fa.fa-info-circle(aria-hidden='true')
            | Información
          el-menu-item(index='2-3')
            i.fa.fa-sign-out(aria-hidden='true')
            | Salir
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
          cursor: pointer;
        }
      }

      .logo-img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .right-section {
      display: flex;
      height: $header-height;
      align-items: center;
      justify-content: flex-end;
      flex-direction: row;
      padding: 0 30px;

      .img-gravatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        position: relative;
        left: 25px;
      }
    }
  }
</style>
