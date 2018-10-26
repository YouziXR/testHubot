/**
 * 图灵机器人API
 */



let Turing = function(robot, res, msgText) {
  if (!res.message.text) {
    return;
  }
  let request = require('request');
  // let msgText = res.message.text;
  // msgText = msgText.match(robot.respondPattern('/(.*)/'));
  // res.reply(msgText[1]);

  let queryWord = msgText.trim();
  // res.reply(queryWord);
  let API = 'http://openapi.tuling123.com/openapi/api/v2';
  let keys = 'ad564df2f8cb44bea93d59524833f348';

  // userId is a user identifier code
  let userid = new Date().getTime().toString(13);
  // let userid = res.envelope.user.id;
  let Data = {
    reqType: 0,
    perception: {
      inputText: {
        text: queryWord
      }
    },
    userInfo: {
      apiKey: keys,
      userId: userid
    }
  }
  // let requestData = JSON.stringify(Data); // no need to stringify JSON
  request({
      url: API,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: Data
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
        // res.reply(response);
        // res.reply('success: ' + body);
        // res.reply(`error code: ${error}`);
        // body = JSON.parse(body);
        // res.reply(body.intent.code, body.intent.parameters);
        let results = body.results;
        // res.reply(Object.getOwnPropertyNames(results[1].values.news[0]));
        for (let i = results.length - 1; i > -1; i--) {
          if (results[i].resultType == 'url') {
            res.reply(results[i].values.url);
          } else if (results[i].resultType == 'text') {
            res.reply(results[i].values.text);
          } else if (results[i].resultType == 'news') {
            for (let j = 0; j < (results[i].values.news.length > 5 ? 5 : results[i].values.news.length); j++) {
              res.reply(results[i].values.news[j].name, results[i].values.news[j].detailurl);
            }
          }
        }
        // res.reply(results[0].values.text);
      } else {
        // console.log(`error code: ${error}`);
        res.reply('failed: ' + body);
        res.reply(`error code: ${error}`);
      }
    });
}

module.exports = (robot) => {
  // A limitation in catchAll function, if nothing matches the text, catchAll will be executed. 
  // But if people are talking to other people, not the robot, catchAll will be executed, too. 
  // So at first, we should check the res.message.text to see if it matches robot.respondPattern.
  // robot.respondPattern is a function that returns a regExp to check if the message is sent to the robot, usage is like if statements blow.
  robot.catchAll(
    (res) => {
      /*if (!(robot.respondPattern('/(.*)/').test(res.message.text))) { return }*/
      // res.reply(Turing);
      // let envelope = res.envelope;

      // res.reply(`for test: ${Object.getOwnPropertyNames(res.envelope.room)}`);
      // res.reply(`for test: ${Object.getOwnPropertyNames(res.envelope.user)}`);

      // res.reply(Object.getOwnPropertyNames(res.envelope.room));
      // res.reply(res.envelope.room.hasOwnProperty(''));
      if (res.envelope.room != null) {
        // only respond message with '@robotName' 
        // res.reply(`in room: ${res.message.text}`);
        let ary = res.message.text.match(/(@鼬子)(.*)/);
        if (ary[1]) {
          let msg = ary[2];
          Turing(robot, res, msg);
          return;
        }
      }
      else if (res.envelope.user != null) {
        // res.reply(`in user: ${res.message.text}`);
        Turing(robot, res, res.message.text);
        return;
      }
      /*res.reply(res.envelope.user.id);
      res.reply(res.envelope.user.name);
      res.reply(res.envelope.user.room);*/
      // res.reply(Object.getOwnPropertyNames(res.envelope.room));
      // Turing(robot, res);
      // return;
    }
  )
}
