const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const talkedRecently = new Set();
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  if (talkedRecently.has(message.author.id))
  return;

    let member = message.mentions.members.first();
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${member.id}"`).then(row => {
      if (!row) return
      if (row.levelsystem === "disabled") return;

      sql.run(`UPDATE profiles SET rep = ${row.rep += 1} WHERE guildId ="${message.guild.id}" AND userId = ${member.id}`);
    message.channel.send("Vous avez rep cet utilisateur. Veuillez patienter encore une heure pour rep à nouveau.")
  setTimeout(() => {
      // wait 1 hour
  }, 60 * 60000);
})
}