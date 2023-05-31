const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "unmute")
            .addField("Utilisation", prefixtouse + "unmute @Someone <raison>")
            .addField("Exemple", prefixtouse + "unmute @Someone le temps de silence est terminé.")
            .setDescription("Description: " + "Retire un utilisateur du rôle Muted");

 if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_ROLES. :x:')
  if (message.mentions.users.size < 1) return message.channel.send("Vous n'avez pas mentionné d'utilisateur à unmute");
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas rendre la parole à cet utilisateur. Il est au même niveau que vous ou plus haut. :x:');
  let reason = args.slice(1).join(' ') || `Le modérateur n'a pas donné de raison.`;
  let modlog = message.guild.channels.find('name', row.logschannel);
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply('Je ne trouve pas le rôle Muted :x:')
  if (reason.length < 1) return;
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Un-mute")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Raison", reason, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      if (!modlog) return;
      client.channels.get(modlog.id).send({embed})
      if (row.logsenabled === "disabled") return;
      message.channel.send("***L'utilisateur a récupéré la parole avec succès! :white_check_mark:***")
       })
      }
    }
  })
}