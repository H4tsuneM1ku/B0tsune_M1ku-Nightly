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
            .setTitle("Commande: " + prefixtouse + "softban")
            .addField("Utilisation", prefixtouse + "softban @Someone <raison>")
            .addField("Exemple", prefixtouse + "softban @Someone essaye de créer des ennuis.")
            .setDescription("Description: " + "Banni et débanni un utilisateur du serveur actuel");

 if (message.member.hasPermission("KICK_MEMBERS")) {
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission KICK_MEMBERS. :x:')
    let reason = args.slice(1).join(' ') || `Le modérateur n'a pas donné de raison.`;
    if (message.mentions.users.size < 1) return message.channel.send(usage)
    let user = message.guild.member(message.mentions.users.first());
    if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas softban ce membre. Il est au même niveau que moi ou plus haut. :x:');
    let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
    if (!message.guild.member(user).bannable) return message.reply('Ce membre n\'est pas bannissable. Peut-être possède-t-il un rôle plus élevé que le mien?');
    if (reason.length < 1) return;
    message.channel.send("***L'utilisateur a été softban avec succès! :white_check_mark:***")
    message.guild.ban(user, 2);
    message.guild.unban(user, 2);
    sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
    const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Soft Ban")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Raison", reason, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
    }
  })
}
   
