const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = (message.guild.members.filter(m => m.presence.status != 'offline').size - message.guild.members.filter(m=>m.user.bot).size)
      const embed = new Discord.RichEmbed()
            .setAuthor("Nom du serveur: " + message.guild.name, message.guild.iconURL)
            .setColor(0x7700cf)
            .addField('Membres', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}`, true)
            .addField('En ligne', `${online}`, true)
            .addField("Bots", message.guild.members.filter(m=>m.user.bot).size)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
}
   
