const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        const user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.channel.send("Vous devez mentionner un utilisateur pour le voler.")
        if (user.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous voler de l'argent.")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row2 => {
                if (!row) return message.channel.send("Ce membre n'a pas d'argent, il doit d'abord commencer par parler.")
                if (!row2) return message.channel.send("Ce membre n'a pas d'argent. Il doit commencer par en récolter pour que vous puissiez le voler.")
                if (row2.cash < 0) return message.channel.send("L'utilisateur n'a pas d'argent à voler.")
                var dice = Math.floor(Math.random() * 99 + 1);
                var dice2 = Math.floor(Math.random() * row2.cash);
                var dice3 = Math.floor(Math.random() * 1000 + 1);
                if (dice >= "75") {
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice2} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    sql.run(`UPDATE profiles SET cash = ${row2.cash -= dice2} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
                    message.channel.send("Vous avez volé $" + dice2 + ", avec succès à " + user.username + ", Nouveau montant: $" + row.cash + ".")
                } else {
                    sql.run(`UPDATE profiles SET cash = ${row.cash -= dice3} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("Vous avez été surpris à voler " + user.username + ", et avez payé une amende de: $" + dice3 + ", Nouveau montant: $" + row.cash + ".")
                }
            })
          })
}
