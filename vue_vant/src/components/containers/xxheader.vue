<template>
    <div style="widht:100%;height:100px;">
       <div class="head">
           <van-icon name="arrow-left" class="icon" @click="change()"/>
           <span>{{arr[0]}}</span>
           <span class="icon iconfont icon-fenxiang"></span>
       </div>
    </div>
</template>


<script>
import Vue from 'vue'
import { Icon } from 'vant';

Vue.use(Icon);

export default {
    props: ["type"],
    data() {
        return {
           arr:[]
        }
    },
    components: {
        
        },
    methods: {
        change(){
            location.href = "#/home";
        }
    },
    mounted() {
       console.log(this.type);
            if(this.type==='page'){
				this.arr = ['正文页']
			}else if(this.type==='login'){
                this.arr = ['登录'];
                $(".icon").removeClass("icon-fenxiang");
			}else if(this.type==="reg"){
                this.arr = ['注册'];
                $(".icon").removeClass("icon-fenxiang");     
		    }else{
                this.arr= ['搜索'];

            }
    }
}
</script>

<style  scoped>
   .head{
     width: 100%;
     height: 100px;
     display:flex;
     justify-content: space-between;
     font-size:0.3466666666666667rem;
     align-items:center;
     background-color: #75A45D;
     color:#fff;
    
}
.icon{
    font-size:50px;
    padding:0 10px;
}
</style>