<template>
    
    <div >
        <div @mousewheel="getnow($event)" @click = "clickfun($event)">

              <div class="swiper-container swiper-container-horizontal swiper-container-ios">
                <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(-262.5px, 0px, 0px);">
                  <div class="swiper-slide menu swiper-slide-prev">Menu slide</div>
                  <div class="swiper-slide content swiper-slide-active">
                    <div class="menu-button">
                      <!-- <div class="bar"></div>
                      <div class="bar"></div>
                      <div class="bar"></div> -->
                    </div>
                        <home />
                  </div>
                </div>
              <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

            
        </div>
         <xfooter /> 
    </div>
       

</template>
<script>
import home from "./../home/home.vue";
import xfooter from "./../home/xfooter.vue";
import "swiper/dist/css/swiper.min.css";

import Swiper from "swiper";

export default {
  data() {
    return {};
  },
  components: {
    home,
    xfooter
  },
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
    }
  },
  mounted() {
    // 滚动
    window.addEventListener("scroll", this.getnow);
    //轮播图
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
.menu {
  min-width: 100px;
  width: 70%;
  max-width: 320px;
  background-color: #2c8dfb;
  color: #fff;
}
</style>

