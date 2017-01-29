<script>
  export default {
    data() {
      return {
        files: []
      };
    },
    methods: {
      onBeforeUpload(file) {
        // If false is returned, uploading will be aborted.
        // We are not handling uploading in this step, maybe we should in the future.
        const reader     = new FileReader();
        reader.onloadend = () => {
          this.files.push({
            name: file.name.split(' ').join('-'),
            url : file.url,
            data: reader.result
          });
        };
        reader.readAsDataURL(file);
        return false;
      },
      onRemove(file) {
        const index = this.files.findIndex(f => f.name === file.name);
        this.files.splice(index, 1);
      },
      onSubmit() {
        this.$emit('file-upload-submitted', this.files);
      }
    }
  };
</script>

<template lang='pug'>
  .uploader
    el-upload(
      action='//jsonplaceholder.typicode.com/posts/',
      type='drag',
      :multiple='true',
      :on-remove='onRemove',
      :default-file-list='files',
      :before-upload='onBeforeUpload'
    )
      i.el-icon-upload
      .el-dragger__text
        | Drop file here or
        em click to upload
      .el-upload__tip(slot='tip') jpg/png files with a size less than 500kb

    .button-wrapper
      el-button(type='primary', @click='onSubmit') Siguiente
</template>

<style lang='scss' scoped>
  .uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .button-wrapper {
    width: 360px;
    justify-content: flex-start;
    display: flex;
    margin-top: 40px;
  }
</style>
