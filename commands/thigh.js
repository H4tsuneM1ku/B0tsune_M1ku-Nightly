const discord = require('discord.js');
const superagent = require('superagent')

exports.run = (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'thigh'})
    .end((err, response) => {
            const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setImage(response.body.message)
                    .setFooter("Thigh • Powered by Reddit")
                message.channel.send({ embed });
        });
  } else {
    message.channel.send("Ce salon n'est pas NSFW !")
  }
};


