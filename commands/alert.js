module.exports.run = (bot, message, args) => {
let msg = args.join(" ");
if (message.author.id == message.guild.ownerID, '258394351628058636') {
   message.channel.send("Alerte aux membres...")
  message.guild.members.forEach(member => {
    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("MANAGE_GUILD") && !member.user.bot) {
      if (!msg) {
        member.send(`**${message.author.username}** vous appelle dans le serveur **${message.guild.name}**.`)
        message.channel.send(`**${member.user.username}** alerté.`)
      } else {
        member.send(`**${message.author.username}** vous appelle dans le serveur **${message.guild.name}**. Message: **${msg}**`)
        message.channel.send(`**${member.user.username}** alerté.`)
      }
    }
  })
  } else {
    message.channel.send("Seul le propriétaire du serveur peut utiliser cette commande.");
  }
}