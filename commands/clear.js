const Discord = require('discord.js');

/*exports.run = async (bot, message, args) => {

if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas effacer les messages car vous n'avez pas les permissions suffisantes !").then(msg => msg.delete(5000));
  // This command removes all messages from all users in the channel, up to 100.
  
  // get the delete count, as an actual number.
  const deleteCount = parseInt(args[0], 10);
  
  // Ooooh nice, combined conditions. <3
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Veuillez entrer un chiffre entre 2 et 100 pour le nombre de messages à effacer");
  
  // So we get our messages, and delete them. Simple enough, right?
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Je ne peux effacer les messages: ${error}`))
    message.channel.send(`${deleteCount} messages effacés`).then(msg => msg.delete(5000));
}*/

exports.run = async (client, message, args) => {
  await message.delete().catch(() => {});


  args.amount = parseInt(args[0], 10);
  let messages = await message.channel.fetchMessages({
    limit: args.amount && args.amount < 100 ? args.amount : 100
  });

  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }


  if (user) {
    messages = messages.filter(message => message.author.id === user.id);
  }
  else if (args.user) {
    messages = messages.filter(message => message.author.id === args.user);
  }
  else if (args.bots) {
    messages = messages.filter(message => message.author.bot);
  }
  if (args.nonpinned) {
    messages = messages.filter(message => !message.pinned);
  }
  if (args.time) {
    let requiredTimestamp = message.createdTimestamp - (args.time * 60 * 1000);
    messages = messages.filter(message => message.createdTimestamp >= requiredTimestamp);
  }


  let clearedMessages = await message.channel.bulkDelete(messages, true);
  if (!clearedMessages.size) {
    return message.channel.send('Il n\'y a aucun message à supprimer.');
  }


  await message.channel.send({
    embed: {
      color: 0x7700cf,
      description: `J'ai effacé ${clearedMessages.size}${args.nonpinned ? ' non pinnés' : ''} messages de ${user ? user : args.bots ? 'BOTs' : 'tout le monde'}${args.time ? ` envoyés dans les dernières ${args.time} minutes` : ''}.`
    }
  }).then(msg => {
    msg.delete(10000).catch(() => {});
  }).catch(e => {
    client.log.error(e);
  });


  let reason = 'Aucune raison donnée';
  client.emit('moderationLog', message, message.channel, reason, {
    cleared: `${clearedMessages.size}${args.nonpinned ? ' non pinnés' : ''} messages de ${user ? user : args.bots ? 'BOTs' : 'tout le monde'}${args.time ? ` envoyés dans les dernières ${args.time} minutes.` : ''}`
  });
};