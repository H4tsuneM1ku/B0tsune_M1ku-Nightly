const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas tacler personne")
      let user = message.mentions.users.first();
      const embed = new Discord.RichEmbed()
      	.setColor(0x7700cf)
      	.setTitle(`${message.author.username} a taclé ${user.username}`)
      	.setImage('http://gifimage.net/wp-content/uploads/2017/07/anime-tackle-hug-gif-12.gif')
		message.channel.send(embed);
}