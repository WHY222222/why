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
      action="/api/upload/img"
      target="uploadFrame">
      <p style="margin:10px 0;">上传图片:
          <input type="file" name="avatar" multiple="multiple" id='myImg' ref="myImg" @change="uploadImg"/>
          <input type="submit" id="fileSubmit" value="上传" />
      </p>
  </form>

    <img :src="resImg" alt="">

    <div class="wrapper" style="width: 100px;overflow: hidden;">
      <p class="child" style="float: left;width: 50px;height: 40px;border: 1px #000 solid;">1234</p>
      这是什么高价的十分骄傲手机爱神的箭哦啊哈电视剧
    </div>



    <div class="trafic-light">
      <div class="i red"></div>
      <div class="i orange"></div>
      <div class="i green"></div>
    </div>

  </div>


</template>

<script>
export default {
  data () {
    return {
      options: {
        // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
        //target: '/api/tshow/uploadPic',
        target: '/upload/img',
        testChunks: false
      },
      attrs: {
        accept: 'image/*'
      },
      resImg: ''
    }
  },
  components: {

  },
  methods: {
    uploadImg(){
      let myImg = document.getElementById('myImg').files;
      var params = new FormData();
      params.append('avatar', this.$refs.myImg.files[0]);
      params.append('picName', 'why');
      console.log(myImg);
      this.$http.post('/upload/img',params,{
        'headers': {
          'Content': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res);
        this.resImg = res.data.avatar;
        console.log(this.resImg)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="less" >
.trafic-light {padding:10px;background-color:#333;border:2px solid #000;width:30px;border-radius:10px;margin: 100px auto;}
.i {margin:5px 0;height:26px;border:2px solid #000;border-radius:50%;animation-duration:10s;animation-timing:linear;-webkit-animation-iteration-count: infinite;animation-iteration-count: infinite;}
.red {background-color:#300;animation-name:redlight;}
.orange {background-color:#430;animation-name:orangelight;}
.green {background-color:#030;animation-name:greenlight;}

@keyframes redlight {
  0% {
    background-color:#f00;
  }
  39% {
    background-color:#f00;
  }
  40% {
    background-color:#300;
  }
}
@keyframes orangelight {
  0% {
    background-color:#430;
  }
  39% {
    background-color:#430;
  }
  40% {
    background-color:#fc0;
  }
  59% {
    background-color:#fc0;
  }
  60% {
    background-color:#430;
  }
}
@keyframes greenlight {
  0% {
    background-color:#030;
  }
  59% {
    background-color:#030;
  }
  60% {
    background-color:#0a0;
  }
  99% {
    background-color:#0a0;
  }
  100% {
    background-color:#030;
  }
}

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
