const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        const user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.channel.send("Vous devez mentionner un utilisateur pour lui transférer de l'argent.")
        let transferamount = parseInt(args.slice(1).join(' '));
        let taxtransfer = (transferamount / 100) * 80;
        let taxtransferz = (transferamount / 100) * 20;
        if (transferamount <= 1) return message.channel.send("Vous ne pouvez rien donner en dessous de 1.");
        if (isNaN(transferamount)) return message.channel.send("Ce n'est pas un nombre valide.");
        if (user.id === message.author.id) return message.channel.send("Je ne peux pas transférer de l'argent à vous-même.")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                    if (!row) return message.channel.send("Vous n'avez pas d'argent, vous devez d'abord commencer à parler.")
                if (row.cash < transferamount) return message.channel.send("Vous n'avez pas autant d'argent à transférer, vous avez: $" + row.cash);
                sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("J'ai transféré $" + taxtransfer + " à " + user.username + " avec succès. Taxe de transaction: $" + taxtransferz + ", Nouveaux fonds: $" + row.cash + ".")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row2 => {
                 if (!row2) return message.channel.send("Vous n'avez pas d'argent, vous devez d'abord commencer à parler.")
                    sql.run(`UPDATE profiles SET cash = ${row2.cash += taxtransfer} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
            })
          })
}
