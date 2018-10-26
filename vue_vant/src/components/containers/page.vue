<template>
    <div class="page">
        <div @mousewheel="getnow($event)" @click = "clickfun($event)">
            <!-- 头部 -->
             
              <xxheader type="page"  :class="isFixed== true?'isFixed':''"/>

            <!-- 中间正文 -->
            <section class="pannel">
                <div class="title"> 
                    <div>
                        <span>推荐</span>
                        <p>{{total.title}}</p>
                    </div>
                    <div>
                        <span>
                            <img :src="total.usercover" alt="">
                        </span> 
                        <div class="t_name">
                            <span>{{total.user_name}}</span>
                            <span>{{total.time}}</span>
                            <!-- <span>{{total.time.slice(0,10)}}</span> -->
                        </div>   
                        <span v-show="!isStorage"  @click="getok">关注</span>
                        
                    </div>
                </div>
                <div  class="content">
                    <div v-html="total.content">
                    </div>

                </div>

            <!-- 相关文章 -->
                <div class="all_article">
                    <h3 class="h3_title">
                        <strong><a href="#">相关文章</a></strong>
                        <a href="#" rel="nofollow"></a>
                    </h3>
                    <ul class="r_articles"> 
                        <li v-for="(r,index) in related" :key="index">
                            <div class="b_pic">
                                <img :src="r.postcover" alt="">
                            </div>
                            <div class="r_con">
                                <p>{{r.title}}</p>
                                <p class="some_all">
                                    <span>
                                        <img :src="r.user.usercover" alt="">
                                    </span>    
                                    <span class="iconfont icon-xinxi">{{r.comment_cnt}}</span>
                                    <span class="iconfont icon-dianzan">{{r.praise_cnt}}</span>
                                </p>
                            </div>
                        
                        </li>
                    </ul>
                </div>

                <!--评论 -->
                <div class="all_comment" id="all_comment"> 
                    <h3 class="h3_title">
                        <strong><a href="#">全部评论</a></strong>
                        <a href="#" rel="nofollow"></a>
                    </h3>
                    <ul>
                        <li v-for="(c,index) in comment" :key="index">
                            <div class="c_com">
                                <span>
                                    <img :src="c.usercover" alt="">
                                </span>
                                <div class="c_total">
                                    
                                        <span class="c_name">{{c.user_name}}</span>
                                        <span class="c_title">{{c.time.slice(5,16)}}</span>
                                    <p>   
                                        <span>回复<a href="#">@{{c.parent.user_name}}</a> ：<span v-text="c.content"></span></span>
                                    </p>
                                    <p class="small_icon">
                                        <i class="iconfont icon-xinxi"></i>
                                        <i class="iconfont icon-dianzan" @click="clickzan($event)">{{c.praise_cnt}}</i>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="font-size:40px; text-align:center;">没有更多了</div>
                </div>
            </section>
            <!-- 底部 -->          
                <div class="f_content">
                    <div class="foot">
                        <span class="iconfont icon-weixinpengyouquan"></span>
                        <i></i>
                        <span class="iconfont icon-dianzan">{{total.praise_cnt}}</span>
                        <i></i>
                        <span class="iconfont icon-xinxi"></span>
                        <span class="iconfont icon-gengduo"></span>
                    
                    </div>

                </div>
         
            <!-- 返回顶部 -->
            <div>
                <span class="gotop iconfont icon-xinxi" @click="goTop()"></span>
            </div>


        </div>
    </div>
</template>


<script>
// eslint-disable-next-line.
/* eslint-disable */
import Vue from "vue";

import http from "./../../utils/HttpClient";
import xxheader from "./xxheader.vue";

import { ImagePreview } from "vant";

export default {
  data() {
    return {
      active: 0,
      total: "",
      related: "",
      comment: "",
      isgoTop: true,
      images: [],
      startPosition: 0,
      praise_cnt: 0,
      isFixed:true,
      isStorage:false,
      pid:""
    };
  },
  components: {
    xxheader
  },
  created() {
    this.isStorage =  window.localStorage.getItem('isStorage'+this.pid);
  },
  methods: {
    // 是否关注
    getok(){
      // console.log(this.isStorage);
       var storage=window.localStorage;
            
            storage.setItem("isStorage",true);

            this.isStorage = true;

            // console.log(typeof storage["c"]);
        
    },
    //   获取详情
    getUrl() {
      var url = location.href;
      var arr = url.split("?");
      var pid = arr[1].split("=")[1];
      this.pid = pid
      console.log(pid);
      var self = this;
      $.ajax({
        url: "http://localhost:3000/detail",
        type: "get",
        data: {
          pid: pid
        },
        success(data) {
          var data = JSON.parse(data);
          var res = JSON.parse(data).data;
          self.total = res;
          console.log(self.total);
          self.related = res.related;
          //   console.log(self.related);
        }
      });
    },
    // 获取评论
    getgetComment() {
      var url = location.href;
      var arr = url.split("?");
      var pid = arr[1].split("=")[1];

      var self = this;
      $.ajax({
        url: "http://localhost:3000/comment",
        type: "get",
        data: {
          id: pid
        },
        success(data) {
          var data = JSON.parse(data);
          var res = JSON.parse(data).data;
          self.comment = res;
          console.log(self.comment);
        }
      });
    },
    //回到顶部
    goTop() {
      this.isgoTop = !this.isgoTop;
      //   console.log(this.isgoTop);
      if (this.isgoTop) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else {
        $(".gotop").removeClass("icon-xinxi");
        $(".gotop").addClass("icon-fanhuidingbu2");
        // 跳转锚点指定位置，不改变url
        document.querySelector("#all_comment").scrollIntoView(true);
      }
    },
    //获取当前位置
    getnow($event) {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //   console.log(scrollTop)
      if(scrollTop < 500){
        this.isFixed = false; 
      }
      if (scrollTop > 500) {
        // console.log(this.$refs);
        $(".gotop").css("display", "block");
        this.isFixed = true;
      }
      if (scrollTop > 2000) {
        $(".f_content").css("display", "none");
      }
      if (scrollTop < 1500) {
        $(".f_content").css("display", "block");
      }
      if (scrollTop < 1000) {
        $(".gotop").removeClass("icon-fanhuidingbu2");
        $(".gotop").addClass("icon-xinxi");
        $(".gotop").css("display", "none");
      }
    },
    // 点击大图
    clickfun(e) {
      // e.target 是你当前点击的元素 e.currentTarget 是你绑定事件的元素
      var currentEle = e.target.src;

      var newSrc = [];
      var newImg = $(".content").find("img");

      $.each(newImg, function(index, value) {
        var bq = value.currentSrc;
        newSrc.push(bq);
      });
      this.images = newSrc;
      //   console.log($.inArray(currentEle,this.images));
      // 判断是否存在于数组之中，并放回该条数据的索引值
      this.startPosition = $.inArray(currentEle, this.images);

      if (currentEle) {
        // ImagePreview(this.images);
        ImagePreview({
          images: this.images,
          startPosition: this.startPosition,
          //退出时操作
          onClose() {
            // do something
          }
        });
      }
    },
   
  },
  mounted() {
    //监听滑动
    window.addEventListener("scroll", this.getnow);
    this.getUrl();
    this.getgetComment();
  }
};
</script>



<style lang="scss" scoped>


.isFixed{
            position: fixed;
            top: 0px;
            z-index: 4;
            width: 100%;
        }


.head {
  width: 100%;
  height: 1.0666666666666667rem;
  display: flex;
  justify-content: space-around;
  font-size: 0.3466666666666667rem;
  align-items: center;
  background-color: #75a45d;
  color: #fff;
}
.littlehead {
  width: 100%;
  position:fixed;
  top:0;
}

.foot {
  height: 1.3333333333333333rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.f_content {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.foot span {
  font-size: 0.5rem;
  border-right: 1px solid #ccc;
  padding: 0 50px;
}
.foot {
  span:nth-child(1) {
    color: green;
  }
  span:nth-child(3) {
    color: orangered;
  }
  span:nth-child(6) {
    border-right: 0 none;
  }
}
// 小标题
h3 {
  display: block;
  font-size: 0.24rem;
  -webkit-margin-before: 0.21333333333333335rem;
  -webkit-margin-after: 0.21333333333333335rem;
  -webkit-margin-start: 0rem;
  -webkit-margin-end: 0rem;
  font-weight: bold;
  padding: 0 0.26666666666666666rem;
  overflow: hidden;
}
h3 strong a {
  font-size: 0.4rem;
  border-left: #75a43d 0.06666666666666667rem solid;
  color: #333;
  font-weight: 700;
  padding: 0 0 0 0.06666666666666667rem;
  margin: 0.4rem 0;
  float: left;
}
h3 a {
  float: right;
  color: #75a43d;
  font-size: 0.29333333333333333rem;
  font-weight: 400;
  margin-top: 0.4rem;
  line-height: 0.5866666666666667rem;
  padding-left: 20px;
}

//
.title {
  div:nth-child(1) {
    margin: 30px 0;
    overflow: hidden;
    span:nth-child(1) {
      background-color: orange;
      color: #fff;
      font-size: 40px;
      padding: 10px;
      border-radius: 15px;
      margin-left: 20px;
    }
    p {
      width: 600px;
      font-size: 40px;
      float: right;
      margin: 0;
    }
  }
  div:nth-child(2) {
    overflow: hidden;
    img {
      border-radius: 50%;
    }
    span {
      font-size: 35px;
    }
  }
  span:nth-child(1) {
    float: left;
  }
  span:nth-child(3) {
    float: right;
    background-color: #75a43d;
    width: 2rem;
    height: 0.9333333333333333rem;
    border-radius: 0.2rem;
    line-height: 0.9333333333333333rem;
    color: #fff;
    font-size: 0.3466666666666667rem;
    font-weight: bold;
    text-align: center;
    margin-right: 30px;
  }
  .t_name {
    position: relative;
    height: 100px;
    width: 200px;
    float: left;
    margin-left: 30px;
    span:nth-child(2) {
      font-size: 20px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}

.all_article {
  margin: 30px 0 0;
  position: relative;
  padding-bottom: 16px;
}

// 相关文章
.r_articles {
  margin: 0 20px;
  li {
    // margin: 30px;
    overflow: hidden;
    div:nth-child(1) {
      width: 280px;
      float: left;
    }
    div:nth-child(2) {
      width: 420px;
      float: right;
    }
    .b_pic img {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 15px;
    }
    .r_con {
      font-size: 30px;
      .some_all {
        span:nth-child(1) {
          width: 80px;
          height: 80px;
          img {
            width: 15%;
            border-radius: 50%;
          }
        }
        span:nth-child(2),
        span:nth-child(3) {
          font-size: 40px;
          float: right;
          padding: 0 20px;
        }
      }
    }
  }
}
// 评论
.all_comment {
  width: 750px;
  ul {
    padding: 0 30px;
  }
}
.c_com {
  width: 100%;
  overflow: hidden;
  font-size: 40px;
  position: relative;
  img {
    border-radius: 50%;
  }
  .small_icon {
    position: absolute;
    top: 5px;
    right: 5px;
    i {
      font-size: 40px;
    }
  }
  .c_total {
    .c_name {
      position: absolute;
      top: 5px;
      left: 120px;
    }
    .c_title {
      position: absolute;
      top: 70px;
      left: 120px;
    }
    p {
      margin: 20px;
    }
  }
}
// 返回顶部
.gotop {
  position: fixed;
  right: 20px;
  bottom: 300px;
  background: orange;
  color: #fff;
  font-size: 80px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  display: none;
}
</style>
<style lang="scss">
// 中间正文面板

.pannel {
  margin-bottom: 100px;
  width: 750px;
  // 内容

  .content {
    font-size: 36px;
    background-color: #fff;
    // width: 690px;
    padding: 0 30px;
    p {
      line-height: 45px;
      margin: 0;
    }
    img {
      width: 100%;
      border-radius: 15px;
    }
  }
}
.van-swipe-item {
  img {
    width: 100%;
  }
}
.van-image-preview__index {
  font-size: 40px;
}
</style>

