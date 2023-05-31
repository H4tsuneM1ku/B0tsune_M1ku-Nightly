const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (message.member.hasPermission("MANAGE_ROLES")) {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "giverole")
            .addField("Utilisation", prefixtouse + "giverole @Someone <raison>")
            .addField("Exemple", prefixtouse + "giverole @Someone L'utilisateur ne mérite pas son rôle.")
            .setDescription("Description: " + "Retire un rôle à un membre du serveur.");

  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas retirer le rôle de ce membre. Il est au même niveau ou plus haut. :x:');
  let roleName = args.slice(1).join(' ')
  if (message.guild.member(client.user).highestRole.position > message.guild.roles.find('name', roleName).position) return message.reply(`Je ne peux pas retirer de rôles qui sont au même niveau que le mien ou plus haut. :x:`);
  let guild = message.member.guild;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (roleName.length > 1) return message.reply('Vous devez donner un nom de rôle pour en retirer un utilisateur.');
  if (!roleName) return message.channel.send("Ce rôle n'existe pas. Vérifiez que son écriture est exacte.")
  guild.member(user.user.id).removeRole(roleName);
  message.channel.send(user.user.username + ", a vu son rôle retiré: " + roleName)
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`)
  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Rôle Retiré")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Rôle Retiré", roleName, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
     client.channels.get(modlog.id).send({embed})
        })
    }
}
   
