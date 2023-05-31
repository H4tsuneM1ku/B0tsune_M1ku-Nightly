const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES"))  {
    return message.reply("Vous n'avez pas la permission de changer le pseudonyme du bot.");
    } else {
      let username = args.join(' ');
      if (username.length < 1) return message.reply('vous devez donner un nom pour le client.')
       message.guild.members.get('611567484159655936').setNickname(username);
        const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .addField("Nom défini avec succès!", username + " est le nouveau pseudo du bot. :white_check_mark:");
        message.reply({embed})
  }
}