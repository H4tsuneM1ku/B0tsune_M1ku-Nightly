const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x7700cf)
      .setTitle("Changelog v0.9.4")
      .addField("Changes", "- Ajout de memes\n- Ajout de commandes\n- Modification de la commande help \n- Amélioration du système d'avertissements\n- Correction d’autres petits bugs")
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
 }
   
