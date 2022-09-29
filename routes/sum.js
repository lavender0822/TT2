'use strict'

var express = require('express');
var router = express.Router();
var m_sum = require("../modules/m_sum");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const utils = require("../modules/utils")
var dateFormat = require('dateformat');
const ip = require('ip');

router.get("/", function (req, res, next) {
    res.render("main");
})

router.post("/channel", urlencodedParser, function (req, res) {

    var rtn = {}
    var temp = req.body;
    var s = temp.s
    var timestamp = Date.now();

    let data = ""
    let domain = ""

    try {
        switch (s) {
            case '0': //登入
            case '1': //查询玩家积分(不包括游戏中携带的积分)
            case '2': //上分
            case '3': //下分
            case '4': //请求订单号状态
            case '5': //玩家是否在线
            case '7': //查询玩家积分(包括游戏中携带的积分)
            case '8': //根据账号踢玩家下线
            case '14': //根据账号踢玩家下线
            //case 15://无阻塞上分接口
                let orderid = s == 4 ? temp.orderID : temp.agent + dateFormat(timestamp, "yyyymmddHHMMssl") + temp.account;
                data = "s=" + s + "&account=" + temp.account + "&money=" + temp.money + "&orderid=" + orderid + "&ip=" + ip.address() + "&lineCode=" + temp.LineCode;
                domain = "http://" + temp.domain + ":89/" + "channelHandle?";
                break;
            case '6'://代理拉取牌局记录
            case '9'://代理拉取牌局记录(包含原始数据id)
            case '10'://代理拉取牌局详情
            case '12'://代理拉取玩家输赢排行(天为单位)
            case '13'://代理拉取百人游戏下注点列表
            case '15'://根据对局记录获取一段时间汇总数据
            case '16'://代理拉取牌局记录(包含初始分数)
            case '17'://代理生成加密的同桌玩家链接
            case '18'://对局日志解析
            case '19'://对局日志解析(对外)
            case '20'://代理拉取牌局记录(包含初始分数、gType参数)
            case '22'://对局日志解析(对外)
            case '23'://代理拉取牌局记录(包含初始分数、gType参数)
            case '25'://代理生成加密的同桌玩家链接
            case '26': //去B端获取游戏状态数据
            case '27'://代理拉取玩家输赢排行(天为单位，KindID)
            case '60'://代理拉取玩家输赢排行(天为单位，带总投注)
            case '61'://代理拉取分类统计游戏数据
            case '62'://代理拉取前端地址ws、ld地址
            case '63': //代理改变游戏状态
            case '64'://代理拉取游戏排行依据游戏分类排行
            case '65'://代理拉取活动领奖明细
            case '66'://代理拉取用户活动时间有效投注
            case '67'://代理拉取活动数据汇总
                {
                    let startTime = (new Date(temp.startTime)).getTime();
                    let endTime = (new Date(temp.endTime)).getTime();
                    let accounts = temp.agent + " " + temp.account;
                    let kindID = s == 27 ? "kindId" : s == 62 ? "KindID" : "kindID";
                    let gameId = s == 63 || s == 64 ? "gameId" : "gameid";
                    data = "s=" + s + "&accounts=" + accounts + "&startTime=" + startTime + "&endTime=" + endTime + `&${kindID}=` + temp.kindID + "&dayTime=" + temp.dayTime + "&id=" + temp.id + `&${gameId}=` + temp.gameid + "&gameuserno=" + temp.gameuserno + "&serverID=" + temp.serverID + "&recordID=" + temp.recordID + "&account=" + temp.account + "&status=" + temp.status + "&startDate=" + temp.startDate + "&endDate=" + temp.endDate + "&ip=" + ip.address();
                    domain = "http://" + temp.domain + ":90/" + "getRecordHandle?";
                    break;
                }
            case '70'://子代理上分
            case '71'://子代理下分
            case '72'://currentBrand
                {
                    let orderId = s == 72 ? temp.orderID : '';
                    data = "s=" + s + "&account=" + temp.account + "&money=" + temp.money + "&ip=" + ip.address() + "&orderid=" + orderId ;
                    domain = "http://" + temp.domain + ":60/" + "agentHandle?";
                    break;
                }
            case '0SBO'://根据修改日期获取注单列表
                {
                    let startTime = (new Date(temp.startTime)).getTime();
                    let endTime = (new Date(temp.endTime)).getTime();
                    data = "s=" + s + "&startTime=" + startTime + "&endTime=" + endTime + "&ip=" + ip.address();
                    domain = "http://" + temp.domain + ":78/" + "sportRecordHandle?";
                    break;
                }
        }
        var param = encodeURIComponent(utils.desEncode(temp.DESKey, data));
        var key = utils.keyEncode(temp.agent + timestamp + temp.MD5Key);
        var dataURL = "agent=" + temp.agent + "&timestamp=" + timestamp + "&param=" + param + "&key=" + key;

        m_sum.postChannelHandle(s, domain, dataURL, function (responseData) {
            console.log("responseData:" + responseData);
            res.end(JSON.stringify(responseData));
        });
    } catch (err) {
        console.log(err);
        res.end(JSON.stringify(err));
    }
})

module.exports = router;
