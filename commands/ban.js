const Discord = require('discord.js');

exports.run = (bot, message, args) => {

const userb = message.mentions.users.first();
const banReason = args.slice(1).join(' ');

if (!userb) {
  /*try {
    
  // Check if a valid userID has been entered instead of a Discord user mention
  if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Impossible d\'obtenir un utilisateur Discord avec cet ID utilisateur!');
  // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
  userb = message.guild.members.get(args.slice(0, 1).join(' '));
  userb = user.user;
  } catch (error) {
  return message.reply('Impossible d\'obtenir un utilisateur Discord avec cet ID utilisateur!');
  }*/
  }
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur car vous ne disposez pas des autorisations suffisantes !");//.then(msg => msg.delete(5000));
 // else if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur car vous ne disposez pas des autorisations suffisantes !");//.then(msg => msg.delete(5000));
  if (userb === message.author) return message.channel.send('Vous ne pouvez pas vous bannir'); // Check if the user mention or the entered userID is the message author himsmelf
  if (!banReason) return message.channel.send('Vous n\'avez pas entré de raison pour ce ban, `n.ban @username [raison]`'); // Check if a reason has been given by the message author
  if (!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) return message.channel.send('Vous ne pouvez pas bannir cet utilisateur car le bot ne dispose pas des autorisations suffisantes!'); // Check if the user is bannable with the bot's permissions
  
  message.guild.ban(userb) // Bans the user

  const banConfirmationEmbed = new Discord.RichEmbed()
  .setColor('RED')
  .setTitle(`✅ ${userb.username} a bien été banni!`)
  .setDescription(`Banni par **${message.author.username}#${message.author.discriminator}**\nRaison: ${banReason}`)
  .setThumbnail(userb.avatarURL);
  message.channel.send({
  embed: banConfirmationEmbed
  }); // Sends a confirmation embed that the user has been successfully banned

  const modlogChannelID = '570393734345261067'; // Discord channel ID where you want to have logged the details about the ban
  if (modlogChannelID.length !== 0) {
  if (!bot.channels.get(modlogChannelID )) return undefined; // Check if the modlogChannelID is a real Discord server channel that really exists
  
  const banConfirmationEmbedModlog = new Discord.RichEmbed()
  .setAuthor(`Banned by **${message.author.username}#${message.author.discriminator}**`, message.author.displayAvatarURL)
  .setThumbnail(userb.displayAvatarURL)
  .setColor('RED')
  .setTimestamp()
  .setDescription(`**Action**: Ban
  **User**: ${userb.username}#${userb.discriminator} (${userb.id})
  **Reason**: ${banReason}`);
  bot.channels.get(modlogChannelID).send({
  embed: banConfirmationEmbedModlog
  }); // Sends the RichEmbed in the modlogchannel
  }
};