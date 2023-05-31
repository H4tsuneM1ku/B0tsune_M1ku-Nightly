const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas donner de coup de pied à personne.")
      let user = message.mentions.users.first();
      const embed = new Discord.RichEmbed()
      	.setColor(0x7700cf)
      	.setTitle(`${message.author.username} a donné un coup de pied à ${user.username}`)
      	.setImage('https://vgy.me/04YbOf.gif')
		message.channel.send(embed);
}