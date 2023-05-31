const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_ROLES. :x:');
    if (message.member.hasPermission("MANAGE_ROLES")) {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "giverole")
            .addField("Utilisation", prefixtouse + "giverole @Someone <raison>")
            .addField("Exemple", prefixtouse + "giverole @Someone L'utilisateur est un weeb alors j'ajoute weebsquad.")
            .setDescription("Description: " + "Donne un rôle à un utilisateur dans le serveur actuel");

  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas donner de rôle à ce membre. Il est au même niveau que vous ou plus haut. :x:');
  let roleName = args.slice(1).join(' ')
  let test123 = message.guild.roles.find(r => r.name == roleName)
  if (!test123) return message.channel.send("Ce rôle n'existe pas. Vérifiez que son écriture est exacte.")
  if (test123.position >= message.guild.member(client.user).highestRole.position) return message.reply(`Je ne peux pas donner de rôle qui sont à mon niveau ou plus haut. :x:`);
  let guild = message.member.guild;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (roleName.length < 1) return message.reply('Vous devez donner un nom de rôle pour l\'assigner à un utilisateur.');
  message.guild.member(user.user.id).addRole(test123);
  message.channel.send(user.user.username + ", s'est vu attribuer le rôle: " + roleName)
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`)
  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Rôle donné")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Rôle donné", roleName, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
     client.channels.get(modlog.id).send({embed})
        })
    }
}
   
