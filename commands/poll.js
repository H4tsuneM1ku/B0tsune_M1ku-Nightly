const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission ADD_REACTIONS. :x:')
      const sayMessage = args.join(" ");
     if (sayMessage.length < 1) return message.channel.send("Vous n'avez rien donné pour le sondage.")
     if (message.member.hasPermission("KICK_MEMBERS")) {
       const embed = new Discord.RichEmbed()
       .setColor(0x7700cf)
       .setTitle(" Sondage ")
       .setDescription(`Un sondage a commencé! Le sujet est: "**${sayMessage}**"! Votez maintenant!`)
        message.channel.send(embed).then(m => {
            m.react('✅');
            m.react('❌');
           })
      }
}
   
