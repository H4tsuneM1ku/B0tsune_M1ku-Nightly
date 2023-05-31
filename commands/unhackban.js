module.exports.run = (bot, message, args, discord) => {
  let id = args.join(' ');
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send(`Vous ne pouvez pas débannir cet utilisateur car vous ne disposez pas des autorisations suffisantes !`);
  let member = bot.fetchUser(id)
  .then(user => {
    message.guild.unban(user.id)
    .then(() => {
      message.channel.send(`Très bien, j'ai débannis ${user}.`)
    }).catch(err => {
        message.channel.send(`Échec du déban de ${user}.`)
    })
  }).catch(() => message.channel.send("Désolé, je ne trouve pas d'utilisateur avec cet ID."))
}