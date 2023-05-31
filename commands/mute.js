const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
let chrono = require("chrono-node");
var moment = require('moment');
const superagent = require("superagent");
exports.run = async (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "mute")
            .addField("Utilisation", prefixtouse + "mute @Someone <minutes> <raison>")
            .addField("Exemple", prefixtouse + "mute @Someone 5 spamme dans le général.")
            .setDescription("Description: " + "Réduis quelqu'un au silence pour x minutes");

  if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_ROLES. :x:')
  if (message.mentions.users.size < 1) return message.channel.send(usage)
  let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas taire ce membre. Il est au même niveau ou plus haut. :x:');
  let messagez = parseInt(args[1])
  if (isNaN(messagez)) return message.channel.send("Ce n'est pas un temps valide.")
  if (messagez > 1440) return message.channel.send('Le temps maximum est 1 jour (1440 minutes)');
  if (messagez < 1) return message.channel.send('Le temps doit être au minimum d\'1 minute.');
  let reason = args.slice(2).join(' ') || `Le modérateur n'a pas donné de raison.`;
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  if (reason.length < 1) return;
  let muteRole = client.guilds.get(message.guild.id).roles.find(r => r.name == 'Mute') || client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!muteRole) return message.channel.send(" Je ne trouve pas le rôle `Mute`. :x:");

  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Mute")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Temps", messagez, true)
    .addField("Raison", reason, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())

    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.send("***L'utilisateur a été réduis au silence avec succès pour " + messagez + " minute(s) :white_check_mark:***")

  if (!modlog) {
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
     message.channel.send(user.user.username + ' peut de nouveau parler après ' + messagez +' minute(s)')
     }, messagez * 60000);
    } else if (row.logsenabled === "disabled") {
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
    message.channel.send(user.user.username + ' peut de nouveau parler après ' + messagez +' minute(s)')
     }, messagez * 60000);
    } else {
     client.channels.get(modlog.id).send({embed})
     setTimeout(() => {
     message.guild.member(user).removeRole(muteRole)
    message.channel.send(user.user.username + ' peut de nouveau parler après ' + messagez +' minute(s)')
     }, messagez * 60000);
    }
  })
}
})
}
   
