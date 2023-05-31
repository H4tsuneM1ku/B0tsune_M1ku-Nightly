const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas lancer un high-five à personne.")
      let user = message.mentions.users.first();
      const embed = new Discord.RichEmbed()
      	.setColor(0x7700cf)
      	.setTitle(`${message.author.username} a lancé un high-five à ${user.username}`)
      	.setImage('https://i.imgur.com/7BJ6gfM.gif')
		message.channel.send(embed);
}
   
