/*const Discord = require('discord.js');
  
exports.run = (bot, message, args) => {

const userk = message.mentions.users.first();
const kickReason = args.slice(1).join(' ');
  
if (!userk) {
  try {
    
  // Check if a valid userID has been entered instead of a Discord user mention
  if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Impossible d\'obtenir un utilisateur Discord avec cet ID utilisateur!');
  // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
  userb = message.guild.members.get(args.slice(0, 1).join(' '));
  userb = user.user;
  } catch (error) {
  return message.reply('Impossible d\'obtenir un utilisateur Discord avec cet ID utilisateur!');
  }
  }
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous ne pouvez pas kicker cet utilisateur car vous ne disposez pas des autorisations suffisantes !");//.then(msg => msg.delete(5000));
 // else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur car vous ne disposez pas des autorisations suffisantes !");//.then(msg => msg.delete(5000));
  if (userk === message.author) return message.channel.send('Vous ne pouvez pas vous kicker'); // Check if the user mention or the entered userID is the message author himsmelf
  if (!kickReason) return message.channel.send('Vous n\'avez pas entré de raison pour ce kick, `n.kick @username [raison]`'); // Check if a reason has been given by the message author
  if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.channel.send('Vous ne pouvez pas kicker cet utilisateur car le bot ne dispose pas des autorisations suffisantes!'); // Check if the user is bannable with the bot's permissions
  
  message.guild.member(userk).kick(kickReason) // Bans the user

  const kickConfirmationEmbed = new Discord.RichEmbed()
  .setColor('RED')
  .setTitle(`✅ ${userk.username} a bien été kické!`)
  .setDescription(`Kické par **${message.author.username}#${message.author.discriminator}**\nRaison: ${kickReason}`)
  .setThumbnail(userk.avatarURL);
  message.channel.send({
  embed: kickConfirmationEmbed
  }); // Sends a confirmation embed that the user has been successfully banned

  const modlogChannelID = '570393734345261067'; // Discord channel ID where you want to have logged the details about the ban
  if (modlogChannelID.length !== 0) {
  if (!bot.channels.get(modlogChannelID )) return undefined; // Check if the modlogChannelID is a real Discord server channel that really exists
  
  const kickConfirmationEmbedModlog = new Discord.RichEmbed()
  .setAuthor(`Banned by **${message.author.username}#${message.author.discriminator}**`, message.author.displayAvatarURL)
  .setThumbnail(userk.displayAvatarURL)
  .setColor('RED')
  .setTimestamp()
  .setDescription(`**Action**: Kick
  **User**: ${userk.username}#${userk.discriminator} (${userk.id})
  **Reason**: ${kickReason}`);
  bot.channels.get(modlogChannelID).send({
  embed: kickConfirmationEmbedModlog
  }); // Sends the RichEmbed in the modlogchannel
  }
};*/

const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "kick")
            .addField("Utilisation", prefixtouse + "kick @Someone <reason>")
            .addField("Exemple", prefixtouse + "kick @Someone pour avoir envoyé des invitations")
            .setDescription("Description: " + "Expulse un utilisateur du serveur");

  if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Désolé, il me manque la permission KICK_MEMBERS pour éxécuter la commande. :x:')
    let reason = args.slice(1).join(' ') || `Le modérateur n'a pas donné de raison.`;
    if (message.mentions.users.size < 1) return message.channel.send(usage);
    let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas expulser ce membre. Il est au même niveau que vous ou plus haut. :x:');
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  message.channel.send("***L'utilisateur à bien été expulsé! :white_check_mark:***")
  if (!message.guild.member(user).kickable) return message.reply('I can\'t kick that member :x:');
  message.guild.member(user).kick(); 
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Cas #" + row.casenumber + " | Action: Kick")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Raison", reason, true)
    .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
      }
    })
}