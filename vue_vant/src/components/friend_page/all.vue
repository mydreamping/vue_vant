<template>
    <div style="height:100%; margin-bottom:2rem;" >

        <!-- <van-loading /> -->
        <!-- <van-loading color="yellow" size="100px"/> -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <section>
            <ul class="content">
                <li v-for="(t,index) in total" :key="index">
                    <div class="all_top">
                        <p>
                            <span class="pic">
                                <img :src="t.usercover" alt="">
                                </span>
                           <p>
                               <span>{{t.user_name}}</span>
                               <span>{{t.time.slice(5,10)}}</span>
                            </p> 
                       
                        <p>
                            <span></span>
                            <span></span>
                        </p>
                    </div>
                    <p class="title">{{t.title}}</p>
                    <div class="a_right">
                        <div class="picture">
                            <img :src="t.poststd" alt="">
                        </div>
                        <div class="article">
                            {{t.summary}}
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- 上拉滚动加载 -->
        <van-list v-model="loading" :finished="finished"  @load="onLoad"></van-list>


        <!-- <div class="many">
            <p @click="add()">点击加载更多</p>
        </div> -->

        </van-pull-refresh>
    </div>
    
    
</template>


<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);

import { Loading } from "vant";

Vue.use(Loading);

// 下拉刷新
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);

// 列表加载
import { List } from 'vant';

Vue.use(List);

import http from "./../../utils/HttpClient";

export default {
  props: ["type"],
  data() {
    return {
      total: "",
      num: "",
      startidx: 0,
      count: 0,
      isLoading: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    getall() {
      var self = this;
      $.ajax({
        url: "http://localhost:3000/all",
        type: "get",
        data: {
          startidx: 0,
          num: 10
        },
        success(data) {
          var data = JSON.parse(data);
          // console.log(JSON.parse(data));

          // console.log(JSON.parse(data).data);
          var res = JSON.parse(data).data;
          self.total = res;
          
          console.log(res);
        }
      });
    },
    add() {
      var self = this;
      // var  startidx;
      self.startidx++;

      $.ajax({
        url: "http://localhost:3000/all",
        type: "get",
        data: {
          startidx: self.startidx,
          num: 10
        },
        success(data) {
          var data = JSON.parse(data);
          console.log(self.startidx);

          // console.log(JSON.parse(data).data);
          var res = JSON.parse(data).data;
          // self.total = res;

          self.total = self.total.concat(res);
          console.log(res);
        }
      });
    },
     onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;

        var self = this;
      // var  startidx;
      self.startidx++;

      $.ajax({
        url: "http://localhost:3000/all",
        type: "get",
        data: {
          startidx: self.startidx,
          num: 10
        },
        success(data) {
          var data = JSON.parse(data);
          console.log(self.startidx);

          // console.log(JSON.parse(data).data);
          var res = JSON.parse(data).data;
          self.total = res;

          // self.total = self.total.concat(res);
          console.log(res);
        }
      });
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {

        console.log("aaa");
        // 执行向下加载的函数

        this.add();
        // 加载状态结束
        this.loading = false;

      
      }, 500);
    }
 
  },
  mounted() {
    this.getall();
  }
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.all_top {
  width: 100%;
  height: 100px;
  p {
    float: left;
  }
  .pic {
    width: 100px;
    height: 100px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}
.title {
  font-size: 40px;
}
.a_right {
  overflow: hidden;
  .picture {
    float: left;
    width: 300px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article {
    float: right;
    width: 380px;
    height: 200px;
    overflow: hidden;
    font-size: 40px;
  }
}
.content {
  background-color: #ececec;
  li {
    margin: 20px;
    background-color: #fff;
    overflow: hidden;
    padding: 15px 0;
  }
}
.many {
  p {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #75a45d;
    text-align: center;
    font-size: 30px;
  }
}
</style>
