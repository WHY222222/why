<template lang="html">
  <div class="cnode_detail_wrapper">
    detail
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  created(){

  },
  mounted(){
    console.log(this.$route)
    let detailId = this.$route.query.detailId;
    console.log('detailId', detailId);
    this.getDetail(detailId);
  },
  methods: {
    getDetail(detailId){
      let params = {
        id: detailId
      }
      this.$http.get('/cnode/detail', {params: params})
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

<style lang="less">

</style>
