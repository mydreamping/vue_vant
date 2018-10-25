<template>
    <div style="height:100%;">
            <div>
               
            </div>
        <van-swipe>
            <van-swipe-item><respond /></van-swipe-item>
            <van-swipe-item><invites /></van-swipe-item>
            
        </van-swipe>
    </div>
</template>


<script>
    
    import respond from "./respond.vue" 
    import invites from "./invites.vue" 
    import http from "./../../utils/HttpClient";
  

export default {
    props:["type"],
    data() {
        return {
          
        }
    },
    components:{
        respond,
        invites
    },
    methods: {
       
    },
    mounted() {
      
    }
}
</script>
<style>

</style>
