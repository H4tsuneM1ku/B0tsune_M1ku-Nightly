const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas vous marier à personne.")
      let user = message.mentions.users.first();
      const embed = new Discord.RichEmbed()
      	.setColor(0x7700cf)
      	.setTitle(`${message.author.username} a demandé ${user.username} en mariage ❤`)
      	.setImage('https://i.imgur.com/u67QLhB.gif')
		message.channel.send(embed);
}
   
