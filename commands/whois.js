const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  let embed2 = new Discord.RichEmbed()
  .setColor(0x7700cf)
  .setThumbnail(message.author.avatarURL)
  .addField("Utilisateur ", `${message.author.tag} (ID: ${message.author.id})`, true)
  .addField("Statut", message.member.presence !== null && message.member.presence.status !== null ? message.member.presence.status : "Hors ligne")
  .addField("Joue à ", `${message.author.presence.game === null ? "Rien" :  message.author.presence.game.name}`, true)
  .addField("Pseudonyme ", `${message.member.displayName}`, true)
  .addField("Rôle(s) ", `${message.member.roles.map(r => r.name).join(", ")}`)
  .addField("Plus haut rôle ", message.member.highestRole.name)
  .addField("A rejoins le serveur le ", `${moment(message.member.joinedAt).format('LLLL')}`)
  .addField("A rejoins Discord le ", `${moment(message.author.createdAt).format('LLLL')}`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL);
if (message.mentions.users.size < 1) return message.channel.send(embed2);
  
let member = message.mentions.members.first();
let embed = new Discord.RichEmbed()
  .setColor(0x7700cf)
  .setThumbnail(member.user.avatarURL)
  .addField("Utilisateur ", `${member.user.tag} (ID: ${member.id})`, true)
  .addField("Statut", member.presence !== null && member.presence.status !== null ? member.presence.status : "Hors ligne")
  .addField("Joue à ", `${member.user.presence.game === null ? "Rien" :  member.user.presence.game.name}`, true)
  .addField("Pseudonyme ", `${member.nickname === null ? "None" : member.nickname}`, true)
  .addField("Rôle(s) ", `${member.roles.map(r => r.name).join(", ")}`)
  .addField("Plus haut rôle ", member.highestRole.name)
  .addField("A rejoins le serveur le ", `${moment(member.joinedAt).format('LLLL')}`)
  .addField("A rejoins Discord le ", `${moment(member.user.createdAt).format('LLLL')}`)
  .setTimestamp()
  .setFooter(member.user.username, member.user.avatarURL);
  message.channel.send({embed})
}
