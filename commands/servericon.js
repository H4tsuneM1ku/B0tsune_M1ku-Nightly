const Discord = require('discord.js');

exports.run = (bot, message, args) => {
const embed = new Discord.RichEmbed()
    .setAuthor(`Icône de ${message.guild.name}`)
    .setImage(`${message.guild.iconURL}?size=2048`)
    .setColor(0x7700cf);
  message.channel.send({ embed });
}