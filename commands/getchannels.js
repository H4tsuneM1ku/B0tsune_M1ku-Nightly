const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
	const embed = new Discord.RichEmbed()
  		.setColor(0x7700cf)
  		.setAuthor("Nombre de channels:")
  		.addField("Vocal", message.guild.channels.filter(chan => chan.type === 'voice').size, true)
  		.addField("Texte", message.guild.channels.filter(chan => chan.type === 'text').size, true)
  		.setTimestamp()
  		.setFooter(client.user.username, client.user.avatarURL);
  	message.channel.send(embed)
    //message.channel.send('Channels vocaux: ' + `${message.guild.channels.filter(chan => chan.type === 'voice').size} | Channels textes:  ${message.guild.channels.filter(chan => chan.type === 'text').size}`)
}
   
