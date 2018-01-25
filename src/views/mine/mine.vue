<template lang="html">
  <div class="mine_wrapper">
    <uploader :options="options" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>


    <form name="uploadForm"
      id="uploadForm"
      method="post"
      enctype="multipart/form-data"
      action="/api/signup"
      target="uploadFrame">
      <p style="margin:10px 0;">上传图片:
          <input type="text" name="name" value="xiangheng">
          <input type="file" name="imageFile" multiple="multiple"/>
          <input type="submit" id="fileSubmit" value="上传" />
      </p>
  </form>




  </div>


</template>

<script>
export default {
  data () {
    return {
      options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          //target: '/api/tshow/uploadPic',
          target: '/api/signup',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        }
    }
  },
  components: {

  },
  methods: {
    selectImg(){
      let imgFile = document.getElementById('imgLocal').files[0];
      console.log(imgFile)
      let formData = new FormData();
      formData.append('file', imgFile);
      this.$http.post('/api/tshow/uploadPic',formData,{
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="less" >
.mine_wrapper{
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
