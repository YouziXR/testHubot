/**
 * 百度翻译API
 */

'use strict'
let md5 = require('./md5.js');
let request = require('request');
// let fs = require('fs');

/*let ismatched = require('../package.json');
let isMatched = ismatched.isMatched;
ismatched = null;*/

let MD5 = md5.MD5
// MD5.MD5 = MD5;
md5 = null;
/**
 * 判断是否中文
 */

function isChinese(s) {
  let patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  return (!patrn.exec(s)) ? false : true;
}

/**
 * 翻译的具体逻辑
 */
function translate(robot, res) {
  if (res.match.length < 2) {
    return;
  }
  let queryWord = res.match[2];
  let [from, to] = isChinese(queryWord) ? ['zh', 'en'] : ['en', 'zh'];


  /*
  百度翻译的API
  */
  // let sampleURL = 'http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=20181022000223035&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4'

  let salt = (new Date).getTime();
  let appid = '20181022000223035';
  let baiduKey = 'tiETVeVNAi7k8f5IVTfd';
  let signStr = appid + queryWord + salt + baiduKey;
  let sign = MD5(signStr);

  // let baiduAPI = http://api.fanyi.baidu.com/api/trans/vip/translate

  let url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURI(queryWord)}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;


  // console.log(queryWord, isChinese(queryWord), isChinese(queryWord));

  request.get(url, function(err, response, body) {
    let data = JSON.parse(body);
    if (!err) {
      res.reply(data.trans_result[0].src + ': ' + data.trans_result[0].dst);
    } else {
      console.log(`Error Code: ${err}`);
      res.reply(`Error Code: ${err}`);
    }
    // res.send(data.trans_result[0].src + ': ' + data.trans_result[0].dst);

    /*if (data.trans_result)
    {
      res.send(JSON.stringify(data.trans_result));
    }
    else
    {
      res.send(data);
    }*/
  });
}


module.exports = function(robot) {
  // if (isMatched) {return };
  robot.respond(
    /(translate|翻译) (.*)/i,
    (res) => translate(robot, res)
  );
  // isMatched = true;
}
