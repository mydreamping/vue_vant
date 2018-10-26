<template>
    <div style="height:100%;">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 问答 -->
          <section>
            <ul class="posts-list qa-square-list qy-qa-list" v-for="t in total">
                <li class="post pos-rel">
                <span class="post-author clearfix">
                        <a class="floatleft-left" href="/user/499011624024145972" rel="nofollow">
                            <img alt="" :src="t.user.usercover">
                        </a>
                        <span class="floatleft-right">
                            <a class="name inline-block" href="/user/499011624024145972">{{t.user.name}}</a>
                                 <div class="auth-type inline-block">
                                                        </div>
                                <em class="msg">{{t.tip_msg}}</em>
                        </span>
                </span>
                <div class="content-abstract">
                        <div class="title">
                            <a class="t-link" href="/question/499014817181335552" title="t.content">{{t.title}}</a>
                        </div>
                                        <div class="text-box qa-link" data-href="/question/499014817181335552">
                                            <div class="abstract">
                                                <div v-html="t.content"></div>
                                        </div>
                                </div>
                    <a class="hidden" href="#">{{t.title}}</a>
                    <!-- qa_id -->
                </div>
                </li>
            </ul>

          </section>
       </van-pull-refresh>
    </div>
</template>


<script>
import Vue from "vue";
import http from "./../../utils/HttpClient";

import { PullRefresh } from "vant";

Vue.use(PullRefresh);

export default {
  props: ["type"],
  data() {
    return {
      startidx: 0,
      num: 0,
      total: "",
      count: 0,
      isLoading: false
    };
  },
  methods: {
    question() {
      var self = this;
      //   var  startidx;
      //   self.startidx++;

      $.ajax({
        url: "http://localhost:3000/question",
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

          //   self.total = self.total.concat(res);
          console.log(res);
        }
      });
    },onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
        var self = this;
        self.startidx++;

      $.ajax({
        url: "http://localhost:3000/question",
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

          //   self.total = self.total.concat(res);
          console.log(res);
        }
      });


      }, 500);
    }
  },
  mounted() {
    this.question();
  }
};
</script>
<style>
section {
  margin-bottom: 160px;
}
ul.posts-list li {
  margin: 0.3rem;
  background: #fff;
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}
li.post {
  background: #fff;
  border-top: 1px solid #efefef;
  margin: 0.3rem 0;
  -webkit-box-shadow: 0 1px 0.1875rem -0.125rem rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 0.1875rem -0.125rem rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 1px 0.1875rem -0.125rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 0.1875rem -0.125rem rgba(0, 0, 0, 0.2);
}
.pos-rel,
nav {
  position: relative;
}
li.post .post-author {
  display: block;
  padding: 0.3rem;
  position: relative;
}
.clearfix:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  zoom: 1;
}
li.post .post-author .floatleft-left {
  height: 0.6rem;
  width: 0.6rem;
  border: 1px solid #e4e4e4;
  margin: 0 1rem 0 0;
  overflow: hidden;
  border-radius: 0.5rem;
}
.floatleft-left {
  float: left;
}
.floatleft-right {
  float: left;
  display: inline-block;
}

/* span{
    font-size: .6rem;
    word-wrap: break-word;
} */
li.post .post-author .floatleft-right a.name {
  color: #75a43d;
  /* line-height: .6rem; */
  /* margin: 1.1rem 0 0; */
  display: block;
}
.inline-block {
  display: inline-block !important;
}

li.post .post-author .floatleft-right em.msg {
  display: inline-block;
  font-size: 30px;
  color: #999;
}

em {
  font-size: 30px;
  word-wrap: break-word;
  font-style: normal;
}

li.post .content-abstract {
  color: #333;
  display: block;
  margin: -0.3rem 0 0;
  padding: 0 0.3rem 0.3rem;
  line-height: 1rem;
  position: relative;
}
li.post .content-abstract .title {
  font-size: 30px;
  font-weight: 700;
  margin: 0.2rem 0;
  color: #75a43d;
}
li.post .content-abstract .text-box {
  font-size: 40px;
}

.hidden {
  /* display: none; */
}
a {
  color: #696;
  font-size: 30px;
  text-decoration: none;
}
div {
  font-size: 30px;
  word-wrap: break-word;
}
</style>
