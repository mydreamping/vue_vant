<template>
    <div style="height:100%; margin-bottom:2rem;" >
        <section>
            <div v-for="(f,index) in first" :key="index" class="big_pic" :data-id="f.pid" @click="getId(f.pid)">
                <img :src="f.hybrid_cover_std" >
                <p class="title">{{f.hybrid_title}}</p>
            </div>
            <ul class="content">    
                <li v-for="(s,index) in some" :key="index" :data-id="s.pid" @click="getId(s.pid)">
                <p class="title">{{s.hybrid_title}}</p> 
                <div class="c_left">
                    <img :src="s.hybrid_cover_std" alt="">

                </div>
                <div class="c_right">
                    <div class="c_top"><span class="small_pic"><img :src="s.usercover" alt=""></span><span class="username">{{s.user_name}}</span></div>
                    <div class="article">{{s.post_summary}}</div>
                </div>
                </li>
            </ul>
        </section>
        <!-- 话题1 -->
        <section>
            <div class="topic">
                <span>旅游话题</span>
                <span>{{name}}</span>

            </div>
                <van-swipe :width="600">
                    <van-swipe-item  v-for="(s,index) in topic1" :key="index">
                        <div class="s_pic">
                            <div class="s_pic_img">
                                <img :src="s.postcover" alt="">
                            </div>
                            <p class="s_title">{{s.title}}</p>
                            <div class="message"> 
                                <div>
                                    <span><img :src="s.usercover" alt=""></span>
                                    <span>{{s.user_name}}</span>
                                </div>
                                <div>
                                    <span><i class="iconfont icon-xinxi"></i>{{s.comment_cnt}}</span>
                                    <span><i class="iconfont icon-dianzan"></i>{{s.praise_cnt}}</span>
                                </div>
                            </div>  
                        </div>
                        </van-swipe-item>
                
                </van-swipe>

        </section>


         <section>
            <ul class="content">    
                <li v-for="(s,index) in second_some" :key="index">
                <p class="title">{{s.hybrid_title}}</p> 
                <div class="c_left">
                    <img :src="s.hybrid_cover_std" alt="">

                </div>
                <div class="c_right">
                    <div class="c_top"><span class="small_pic"><img :src="s.usercover" alt=""></span><span class="username">{{s.user_name}}</span></div>
                    <div class="article">{{s.post_summary}}</div>
                </div>
                </li>
            </ul>
        </section>



        <!-- 话题2 -->
        <section>
            <div class="topic">
                <span>旅游话题</span>
                <span>{{name2}}</span>

            </div>
                <van-swipe :width="600">
                    <van-swipe-item  v-for="(s,index) in topic2" :key="index">
                        <div class="s_pic">
                            <div class="s_pic_img">
                                <img :src="s.postcover" alt="">
                            </div>
                            <p class="s_title">{{s.title}}</p>
                            <div class="message"> 
                                <div>
                                    <span><img :src="s.usercover" alt=""></span>
                                    <span>{{s.user_name}}</span>
                                </div>
                                <div>
                                    <span><i class="iconfont icon-xinxi"></i>{{s.comment_cnt}}</span>
                                    <span><i class="iconfont icon-dianzan"></i>{{s.praise_cnt}}</span>
                                </div>
                            </div>  
                        </div>
                        </van-swipe-item>
                
                </van-swipe>

        </section>


        <section>
            <ul class="content" v-show="isshow">
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

        <div class="many">
            <p @click="add()">点击加载更多</p>
        </div>


       
        
    </div>
</template>


<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe).use(SwipeItem);

import http from "./../../utils/HttpClient";

export default {
  props: ["type"],
  data() {
    return {
      total: "",
      some: "",
      first: "",
      second_some: "",
      swipwer: "",
      count: 0,
      isLoading: false,
      num: 0,
      startidx: 0,
      topic1: "",
      name: "",
      topic2: "",
      name2: "",
      isshow: false
    };
  },
  methods: {
    getNew() {
      var self = this;
      $.ajax({
        url: "http://localhost:3000/index",
        type: "get",
        data: {},
        success(data) {
          // console.log(JSON.parse(data));
          var data = JSON.parse(data);
          var res = data.data;
          console.log(res);
          self.total = res;
          var first = res.slice(0, 1);
          var some = res.slice(1, 5);
          var second_some = res.slice(5);
          self.some = some;
          self.first = first;
          self.second_some = second_some;
          // console.log(some);
        }
      });
    },
    getswiper1() {
      var self = this;

      $.ajax({
        url: "http://localhost:3000/swiper",
        type: "get",
        data: {
          startidx: 0,
          num: 5
        },
        success(data) {
          var data = JSON.parse(data);
          var res = JSON.parse(data).data;
          self.swipwer = res;
          self.topic1 = self.swipwer[0].posts;
          console.log(res);
          self.name = self.swipwer[0].name;
        }
      });
    },
    getswiper2() {
      var self = this;
      $.ajax({
        url: "http://localhost:3000/swiper",
        type: "get",
        data: {
          startidx: 0,
          num: 5
        },
        success(data) {
          var data = JSON.parse(data);
          var res = JSON.parse(data).data;
          self.swipwer = res;
          self.topic2 = self.swipwer[1].posts;
          //   console.log(res);
          self.name2 = self.swipwer[1].name;
        }
      });
    },
    add() {
      this.isshow = true;
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
          //   console.log(res);
        }
      });
    },
    show: function() {
      this.isshow = !this.isshow;
    },
    getId(e){
        console.log(e);
        var pid = e;
        location.href = `#/page?pid=${pid}`
    }
  },
  mounted() {
    this.getNew();
    this.getswiper1();
    this.getswiper2();
  }
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

/* 轮播图 */
.van-swipe__track {
  width: 400rem !important;
}
.van-swipe-item {
  margin-right: 0.13333333333333333rem;
}
.van-swipe__indicators {
  display: none;
}
.big_pic {
  position: relative;
  img {
    width: 100%;
  }
  .title {
    background: rgba(0, 0, 0, 0.5);
    // margin:0 0.2rem;
    color: #fff;
    font-size: 0.4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.10666666666666667rem;
    height: 1.3333333333333333rem;
    line-height: 1.3333333333333333rem;
    text-align: center;
    width: 100%;
  }
}
.content {
  background-color: #ececec;
  li {
    margin: 20px;
    background-color: #fff;
    overflow: hidden;
  }
  .title {
    width: 100%;
    font-size: 40px;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
  }
  .c_left {
    width: 300px;
    height: 250px;
    float: left;
    img {
      width: 100%;
      height: 100%;
      border-radius: 25px;
    }
  }
  .c_right {
    width: 380px;
    height: 250px;
    float: right;
    .small_pic {
      display: block;
      width: 80px;
      height: 80px;
      float: left;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .c_top {
      height: 80px;
    }
    .username {
      font-style: normal;
      display: inline-block;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #75a45d;
      font-size: 40px;
    }
    .article {
      height: 150px;
      font-size: 40px;
      // padding-bottom:10px;
      overflow: hidden;
    }
  }
}
.s_pic {
  width: 600px;
  .s_pic_img {
    width: 600px;
    height: 350px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .s_title {
    white-space: nowrap;
    overflow: hidden;
    font-size: 30px;
    height: 60px;
    line-height: 60px;
  }
}
.topic {
  font-size: 40px;
  height: 70px;
  line-height: 70px;
  span:nth-child(1) {
    border-right: 1px solid #000;
    padding: 0 20px;
  }
  span:nth-child(2) {
    color: #75a45d;
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
// 话题信息内容
.message {
  margin-bottom: 20px;
  overflow: hidden;
  div:nth-child(1) {
    float: left;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    padding: 0 20px;
    span:nth-child(1) {
      display: block;
      float: left;
      width: 100px;
      height: 100px;
      padding-right: 20px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  div:nth-child(2) {
    float: right;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    span {
      i {
        font-size: 50px;
        color: orange;
        padding: 0 10px;
      }
    }
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
.article {
  float: right;
  width: 380px;
  height: 200px;
  overflow: hidden;
  font-size: 40px;
}
.all_top {
  width: 100%;
  height: 100px;
  p {
    float: left;
  }
  p:nth-child(2) {
    font-size: 40px;
    height: 100px;
    line-height: 100px;
  }
  p:nth-child(1) .pic {
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
}
</style>
