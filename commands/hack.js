const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const talkedRecently = new Set();
exports.run = (client, message, args) => {
    if (talkedRecently.has(message.author.id)) return message.channel.send("Vous avez déjà piraté dans les 15 dernières minutes, attendez s’il vous plaît .")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return;
                var dice = Math.floor(Math.random() * 1000 + 1);
                var dice2 = Math.floor(Math.random() * 3);
                var dice3 = Math.floor(Math.random() * 400 + 1);
                var possiblethingstohack = ["la banque", "Mr. Robot", "un serveur", "le casino", "l'ordinateur de H4tsune", "Discord"];
                if (dice2 >= 2) {
                    message.channel.send("Vous avez été pris en flagrant délit en piratant " + possiblethingstohack[Math.floor(Math.random () * possiblethingstohack.length)] + " et payé une amende de: $" + dice3)
                    sql.run(`UPDATE profiles SET cash = ${row.cash -= dice3} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                } else {
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("Vous avez piraté " + possiblethingstohack[Math.floor(Math.random () * possiblethingstohack.length)] + " avec succès et empoché $" + dice + ", vous pourrez pirater à nouveau dans 15 minutes.")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 15 * 60000);
                }
          })
}
