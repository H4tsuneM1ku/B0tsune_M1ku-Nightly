const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  const emoji = message.guild.emojis;
  if (!emoji.size) return message.channel.send("Le serveur n'a pas d'emojis.")
  const embed = new Discord.RichEmbed()
  .setAuthor("Emojis du serveur")
  .setDescription(emoji.map((e) => e).join(' '))
  .setColor(0x7700cf)
  message.channel.send({embed})
}
   
