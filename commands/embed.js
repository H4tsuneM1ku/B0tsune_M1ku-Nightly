const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (bot, message, args) => {
  const word = args.join(" ")
  if (word < 1) return message.channel.send("Vous n'avez pas donné de texte à embed.")
  const embed = new Discord.RichEmbed()
    .setDescription(word)
    .setColor(0x7700cf);
  message.channel.send({embed});
}
   
