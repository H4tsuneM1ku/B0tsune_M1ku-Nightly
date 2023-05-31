const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("Vous n'avez pas la permission de changer le pseudonyme des membres.");
      if (!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_NICKNAMES. :x:')
      if (message.mentions.users.size < 1) return message.reply('Vous devez d\'abord mentionner quelqu\'un pour changer son pseudonyme. :x:')
      let user = message.guild.member(message.mentions.users.first());
      if (user.highestRole.position >= message.member.highestRole.position ) return message.reply('Je ne peux pas changer le pseudonyme de cet utilisateur. Il est au même niveau ou plus haut. :x:');
      let newusername = args.slice(1).join(' ')
      if (newusername.length < 1) return message.reply('Vous devez donner un nouveau nom pour l\'utilisateur.')
       message.guild.members.get(user.user.id).setNickname(newusername);
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField("Pseudonyme défini avec succès!", newusername + " est le nouveau nom de " + user.user.username + " :white_check_mark:");
        message.reply({embed})
}
