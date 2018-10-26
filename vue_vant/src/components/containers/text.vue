<template>
    <div >
        <div @mousewheel="getnow($event)" @click = "clickfun($event)">
            <!-- <div class="text">text</div> -->
            <div>
               <van-list v-model="loading" :finished="finished"  @load="onLoad">
                  <van-cell v-for="(item,index) in total"  :key="index" :title="item.title"  v-html="item.title + item.summary"   />
                 
                </van-list>

            </div>
            
        </div>

    </div>
</template>
<script>
import Vue from "vue";
// import { ImagePreview } from "vant";

import Swiper from "swiper";

import { List } from "vant";

Vue.use(List);

export default {
  data() {
    return {
      scroll: "",
      startidx: 0,
      list: [],
      loading: false,
      finished: false,
      total: "",
      length: "",
      title:""
    };
  },
  components: {},
  methods: {
    getnow($event) {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      if (scrollTop > 300) {
        $(".go").css("display", "block");
      }
      if (scrollTop > 1000) {
        $(".go").removeClass("icon-xinxi");
        $(".go").addClass("icon-dianzan");
      }
      if (scrollTop < 300) {
        $(".go").removeClass("icon-dianzan");
        $(".go").addClass("icon-xinxi");
      }
    },
    toTop() {
      console.log(666);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    onClose() {
      // do something
    },
    clickfun(e) {
      console.log(e.target);
      // e.target 是你当前点击的元素
      // e.currentTarget 是你绑定事件的元素
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

          console.log(JSON.parse(data).data);
          var res = JSON.parse(data).data;
          // self.total = res;
          self.total = res;
          //   self.total = self.total.concat(res);
          console.log(res.length);

          self.length = res.length;
        }
      });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < this.length; i++) {
          this.list.push(this.list.length + 1);
          // this.list.push(this.title);
        }
        // 加载状态结it束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
         

          var self = this;
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

              console.log(JSON.parse(data).data);
              var res = JSON.parse(data).data;
              // self.total = res;
              self.total = res;
              // self.total = self.total.concat(res);
              console.log(res.length);

              self.length = res.length;
              self.title = res.title;
              // self.title = self.title.concat(res.title);
            }
          });
          

           this.finished = true;  
        }
      }, 500);
    }
  },

  mounted() {
    window.addEventListener("scroll", this.getnow);
    this.add();

    var menuButton = document.querySelector(".menu-button");
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      initialSlide: 1,
      resistanceRatio: 0,
      slideToClickedSlide: true,
      on: {
        init: function() {
          var slider = this;
          menuButton.addEventListener(
            "click",
            function() {
              if (slider.activeIndex === 0) {
                slider.slideNext();
              } else {
                slider.slidePrev();
              }
            },
            true
          );
        },
        slideChange: function() {
          var slider = this;
          if (slider.activeIndex === 0) {
            menuButton.classList.add("cross");
          } else {
            menuButton.classList.remove("cross");
          }
        }
      }
    });
  }
};
</script>
<style>
.text {
  height: 3000px;
  background: pink;
}
.go {
  display: block;
  width: 100px;
  height: 100px;
  position: fixed;
  right: 30px;
  bottom: 300px;
  background: green;
  font-size: 50px;
  color: orange;
  border-radius: 50%;
  text-align: center;
}
</style>


<style>
html,
body {
  position: relative;
  height: 100%;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.menu {
  min-width: 100px;
  width: 70%;
  max-width: 320px;

  background-color: #2c8dfb;
  color: #fff;
}
.content {
  width: 100%;
}

.menu-button {
  position: absolute;
  top: 0px;
  left: 0px;

  padding: 15px;

  cursor: pointer;

  -webkit-transition: 0.3s;
  transition: 0.3s;

  background-color: #2c8dfb;

  /*margin: 14px;
			border-radius: 5px;*/
}
.menu-button .bar:nth-of-type(1) {
  margin-top: 0px;
}
.menu-button .bar:nth-of-type(3) {
  margin-bottom: 0px;
}

.bar {
  position: relative;
  display: block;

  width: 50px;
  height: 5px;

  margin: 10px auto;
  background-color: #fff;

  border-radius: 10px;

  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.menu-button:hover .bar:nth-of-type(1) {
  -webkit-transform: translateY(1.5px) rotate(-4.5deg);
  -ms-transform: translateY(1.5px) rotate(-4.5deg);
  transform: translateY(1.5px) rotate(-4.5deg);
}
.menu-button:hover .bar:nth-of-type(2) {
  opacity: 0.9;
}
.menu-button:hover .bar:nth-of-type(3) {
  -webkit-transform: translateY(-1.5px) rotate(4.5deg);
  -ms-transform: translateY(-1.5px) rotate(4.5deg);
  transform: translateY(-1.5px) rotate(4.5deg);
}

.cross .bar:nth-of-type(1) {
  -webkit-transform: translateY(15px) rotate(-45deg);
  -ms-transform: translateY(15px) rotate(-45deg);
  transform: translateY(15px) rotate(-45deg);
}
.cross .bar:nth-of-type(2) {
  opacity: 0;
}
.cross .bar:nth-of-type(3) {
  -webkit-transform: translateY(-15px) rotate(45deg);
  -ms-transform: translateY(-15px) rotate(45deg);
  transform: translateY(-15px) rotate(45deg);
}
.cross:hover .bar:nth-of-type(1) {
  -webkit-transform: translateY(13.5px) rotate(-40.5deg);
  -ms-transform: translateY(13.5px) rotate(-40.5deg);
  transform: translateY(13.5px) rotate(-40.5deg);
}
.cross:hover .bar:nth-of-type(2) {
  opacity: 0.1;
}
.cross:hover .bar:nth-of-type(3) {
  -webkit-transform: translateY(-13.5px) rotate(40.5deg);
  -ms-transform: translateY(-13.5px) rotate(40.5deg);
  transform: translateY(-13.5px) rotate(40.5deg);
}

.demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
  .mu-appbar {
    width: 100%;
  }
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>