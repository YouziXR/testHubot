/**
 * 图灵机器人API
 */

let request = require('request');
/*let ismatched = require('./package.json');
let isMatched = ismatched.isMatched;
ismatched = null;*/

function Turing(robot, res) {
	if (res.match.length < 2) {
		return;
	}
	let queryWord = res.match[2];
	let API = 'http://openapi.tuling123.com/openapi/api/v2';
	let apikey = 'ad564df2f8cb44bea93d59524833f348';
	let userid = '337812';
	let Data = {
		reqType: 0,
		perception: {
			inputText: {
				text: queryWord
			}
		},
		userInfo: {
			apiKey: apikey,
			uerId: userid
		}
	}
	let requestData = JSON.stringify(Data);
	request({
        url: API,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData},
        function (error, response, body) {
        	if (!error && response.statusCode == 200) {
        		// console.log(body);
        		res.reply('success: ' + body);
        		res.reply(`error code: ${error}`);
        	}
        	else {
        		// console.log(`error code: ${error}`);
        		res.reply('failed' + body);
        		res.reply(`error code: ${error}`);
        	}
        })

}

module.exports = function (robot) {
	// if (isMatched) {return };
	let regexp = new RegExp(/(tuling) (.*)/, 'i');
	robot.hear(regexp, (res) => {
		Turing(robot, res);
	});
	// isMatched = true;
}