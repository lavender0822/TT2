const request = require('request');
const fs = require('fs')
const moment = require('moment')

module.exports = {
    postChannelHandle: function (s, domain, param, callback) {
        // var url = domain + "channelHandle?" + param; //encodeURIComponent(param);
        var url = domain + param; //encodeURIComponent(param);
        console.log('url', url);
        fs.appendFile('log.log', `${moment().format('YYYYMMDD-HH:MM:SS')} 「Request URL」 : ${url}\r\n`, (err) => { });
        request({ url: url, timeout: 60000 }, function (error, response, responseData) {
            if (error || response.statusCode != 200 || responseData == "") {
                // callback(error);
                fs.appendFile('log.log', `${moment().format('YYYYMMDD-HH:MM:SS')} 「Error」 : ${JSON.stringify(error)}\r\n`, (err) => {
                    if (err) throw err;
                    callback(error);
                    return;
                });
            } else {
                var responseData = JSON.parse(responseData);
                console.log(responseData);
                var rtn = responseData.d ? {
                    code: responseData.d.code,
                    d: responseData.d,
                    url: responseData.d.url,
                    money: responseData.d.money,
                    geturl: url
                } : { responseData }

                let reminder = ""
                switch (s) {
                    case 12:
                    case 27:
                    case 60:
                        if (rtn.code === 27) {
                            reminder = "reminder:SQL_UNUSUAL: check if the table statis_allgames(date you input)_users exists?"
                        }
                        break
                    case 26:
                        if (rtn.code === 16) {
                            reminder = "reminder:  ERR.DATA_MISS : (1). can't reach B side, go check the setting of gameConfig.gameServerURl or (2) can reach B side, but not successful (the data code back from B side should be 0) 出现故障，B端访问不通！"
                        }
                        break
                    case 61:
                        if (rtn.code === 16) {
                            reminder = "reminder:  ERR.DATA_MISS : can reach table KYStatis.statis_record_agent_game,but no data result back"
                        }
                        break
                    case 63:
                        if (rtn.responseData.code === 1) {
                            reminder = "reminder: if Error is [connect ECONNREFUSED 127.0.0.1:8880(ip you set)], go check the setting of gameConfig.gameServerURl"
                        }
                        break
                    case 64://代理拉取游戏排行依据游戏分类排行
                        if (rtn.code === 27) {
                            reminder = "reminder:SQL_UNUSUAL: message: ER_NO_DB_ERROR: No database selected"
                        }
                        break
                    default:
                        break
                }
                fs.appendFile('log.log', `${moment().format('YYYYMMDD-HH:MM:SS')} 「Sussess」 : ${JSON.stringify(rtn)} ${reminder}\r\n`, (err) => {
                    if (err) throw err;
                    callback(rtn);
                });
                //   callback(rtn);
            }
        })
    }
}