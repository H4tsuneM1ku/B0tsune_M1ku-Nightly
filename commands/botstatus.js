const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const botstatus = ['En ligne', 'Inactif', 'Ne pas déranger', 'Invisible'];
        const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .addField("Statut du bot: ", `${botstatus[client.status]}`);
        message.channel.send(embed)
}
   
