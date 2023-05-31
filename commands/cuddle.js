const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas câliner personne.")
      let user = message.mentions.users.first();
      const embed = new Discord.RichEmbed()
      	.setColor(0x7700cf)
      	.setTitle(`${message.author.username} a câliné ${user.username} ❤`)
      	.setImage('https://cdn.nekos.life/hug/hug_021.gif')
		message.channel.send(embed);
}
   
