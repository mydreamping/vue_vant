<template>
  <div id="app" style="height:100%;">

    <!-- <van-loading color="#ccc" />       -->
    <!-- <loading v-show="LOADING"></loading> -->
    <router-view></router-view>

    <!-- <Xfooter /> -->
  </div>
</template>




<script>
// import Xfooter from './components/home/xfooter.vue'
// import { mapState } from "vuex";
// import Loading from "./components/containers/loading.vue";

export default {
  data() {
    return {};
  },
  components: {
    // Xfooter
    // Loading
  },
  mounted() {},
  // computed: {
  //   ...mapState(["LOADING"])
  // }
};
</script>

<style>
</style>