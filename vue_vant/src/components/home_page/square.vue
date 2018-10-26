<template>
    <div style="height:100%;" class="square">
            <van-swipe @change="onChange">
                    <van-swipe-item>
                        <respond />
                        </van-swipe-item>
                    <van-swipe-item
                    ><invites />
                    </van-swipe-item>
                        

                          <!-- <van-swipe-item>1</van-swipe-item>
                            <van-swipe-item>2</van-swipe-item> -->
                            
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
            idx:'',
            active: 0,
        }
    },
    components:{
        respond,
        invites
    },
    methods: {
       onChange(idx) {
            console.log('当前 Swipe 索引：' + idx);
            this.active = idx;
        }
    },
    mounted() {
      
    }
}
</script>
<style>


/* .square .van-swipe__indicators{
      top:10px;
    
}
.square .van-swipe__indicator{
    width:150px;
    height: 70px;
    border-radius: 0;
} */

</style>
