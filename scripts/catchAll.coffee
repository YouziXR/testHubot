###
module.exports = (robot) ->
  robot.catchAll (res) ->
    res.reply "复读机：#{res.message.text}"

###