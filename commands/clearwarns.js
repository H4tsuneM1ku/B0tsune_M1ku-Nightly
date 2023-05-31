const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
if (message.member.hasPermission("KICK_MEMBERS")) {
  try {
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission KICK_MEMBERS. :x:')
    let reason = args.slice(1).join(' ');
    if (message.mentions.users.size < 1) return message.channel.send(`Vous devez mentionner un utilisateur pour voir ses avertissements.`)
    let user = message.mentions.users.first();
    sql.get(`SELECT * FROM warnings WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`).then(row => {
      if (!row) return message.channel.send(user.username + " a " + `0` + " warn(s)")
    if (row.userwarnings === 0) {
      message.channel.send(user.username + " a " + row.userwarnings + " warn(s).")
    } else {
      sql.run(`DELETE FROM warnings WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`)
      message.channel.send(user.username + " " + `${row.userwarnings - 1}` + " : ses warn(s) ont été retirés.")
    }
  })
  } catch (err) {
    message.channel.send("Oups, une erreur s'est produite. Plus de détails: " + err + " rapportez ceci au développeur.")
  }
}
}
   
