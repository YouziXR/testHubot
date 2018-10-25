// hear 可以监听房间或群组中任何消息
// respond 只监听直接发给机器人的消息，要指定机器人名称或别名，加入机器人名称是rob，别名是/，格式如下会触发脚本。
/*
- rob open the pod bay doors
- ROB: open the pod bay doors
- @ROB open the pod bay doors
- /open the pod bay doors 
*/
// res参数是response的实例，如果要从机器人返回消息，可以用send或reply

let robotName = 'youzi';
/*let ismatched = require('../package.json');
let isMatched = ismatched.isMatched;
ismatched = null;*/

module.exports = (robot) => {
	// if (isMatched) {return };

	
  { // respond 'hello'
    let regexp = new RegExp(/\b(hello|hi)\b/, 'i');
    let respon = 'oh, hello there';
    robot.respond(regexp, (res) => {
    	res.reply(respon);
    })
  }
  { // respond 'name'
    let regexp = new RegExp(/your name/, 'i');
    let respon = `my name is ${robotName}`;
    robot.respond(regexp, (res) => {
    	// res.reply('reply once');
    	res.reply(respon);
    })
  }

/*  { // respond all
  	let regexp = new RegExp(/(.*)/);
  	let respon = 'no commands found';
  	robot.respond(regexp, (res) => {
  		res.reply(respon + ': ' + res.match[1]);
  	})
  }
  */
 // isMatched = true;
}
