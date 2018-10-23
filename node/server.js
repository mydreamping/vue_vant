var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();



module.exports = router;


//路由(默认数据)
// 发现->推荐广场->大图->某部分信息 
app.get('/index', function (req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    topic()
    function topic() {
        // if (error) throw error;
        request('http://www.iqingyi.com/recommend/getTopicEditorFeeds?latest_view_post_col_time=1539742039&earliest_view_post_col_time=1532922812' + data, function (error, response, body) {

            res.send(body)
            // console.log(body)
        })
    }

})

// 全部信息
app.get('/all', function (req, res) {

    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    send_go(data)

    function send_go(data) {
        request(`http://www.iqingyi.com/recommend/getBestNoteAndRoadmap?startidx=${data.startidx}&num=${data.num}`, function (error, response, body) {
            // console.log(data)
            if (error) throw error;
            res.send(JSON.stringify(body))
        })
    }


})
// 轮播图
app.get('/swiper', function (req, res) {

    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    send_go(data)

    function send_go(data) {
        request(`http://www.iqingyi.com/topic/getHotTopicPosts?startidx=${data.startidx}&num=${data.num}` + data, function (error, response, body) {
            console.log(data);
            if (error) throw error;
            res.send(JSON.stringify(body))
            // console.log(body)
        })
    }


})
// 用户
app.get('/user', function (req, res) {

    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    send_go()

    function send_go() {
        request('http://www.iqingyi.com/recommend/recommendUser?startidx=0&offset=20' + data, function (error, response, body) {
            if (error) throw error;
            res.send(JSON.stringify(body))
            // console.log(body)
        })
    }


})

// 详细信息
app.get('/detail', function (req, res) {

    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    send_go(data)
    console.log(data.pid);
    function send_go(data) {
        request(`http://www.iqingyi.com/post/app_detail?pid=${data.pid}`, function (error, response, body) {
            if (error) throw error;
            res.send(JSON.stringify(body))
        })
    }


})
// 全部评论
app.get('/comment', function (req, res) {

    res.append("Access-Control-Allow-Origin", "*");
    //通过request请求发起http请求，请求后台的数据
    var data = req.query;
    send_go(data)
    console.log(data.id);
    function send_go(data) {
        request(`http://www.iqingyi.com/comment/getCommentByPost?id=${data.id}`, function (error, response, body) {
            console.log(data);
            if (error) throw error;
            res.send(JSON.stringify(body))
        })
    }
})
//监听端口
app.listen(3000);
