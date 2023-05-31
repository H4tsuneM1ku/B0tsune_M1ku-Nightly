const Discord = require('discord.js');

exports.run = (bot, message, args) => {

let img = message.mentions.users.first()
/*let nWord = message.isMentioned(client.users.get('611567484159655936'))
if (!img === nWord) {
  
  const embed = new Discord.RichEmbed()
    .setAuthor(`Avatar de ${img.username}#${img.discriminator}`)
    .setImage(`https://i.imgur.com/1RcLKlI.gif?size=2048`)
    .setColor(0x7700cf);
  message.channel.send({ embed });

} else*/ if (!img) {
  
  const embed = new Discord.RichEmbed()
    .setAuthor(`Avatar de ${message.author.username}#${message.author.discriminator}`)
    .setImage(`${message.author.avatarURL}?size=2048`)
    .setColor(0x7700cf);
  message.channel.send({ embed });

} else if (img.avatarURL === null) {

  message.channel.sendMessage("L'utilisateur ("+ img.username +") n'a pas d'avatar!");

} else {

  const embed = new Discord.RichEmbed()
  .setAuthor(`Avatar de ${img.username}#${img.discriminator}`)
  .setImage(`${img.avatarURL}`)
  .setColor(0x7700cf);
          message.channel.send({ embed });

    };
}