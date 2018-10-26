/**
 * Attendence query from OA API
 * usage: input 考勤|考勤查询 OAID month
 */
/**
 * Attendence query API
 * @Author    Youzi
 * @DateTime  2018-10-26
 * @copyright [copyright]
 * @license   [license]
 * @version   ver.0.1
 * @param     {[type]}    robot [description]
 * @return    {[type]}          [description]
 */
module.exports = (robot) => {
	{
		let regexp = new RegExp(/(考勤查询|考勤)/, 'i');
		let respon = 'http://47.106.65.132/ff/login.html';
		robot.respond(regexp, (res) => {
			res.reply(`自己查去： ${respon}`);
		})
	}
}