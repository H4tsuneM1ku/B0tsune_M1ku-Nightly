const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        let transferamount = parseInt(args[0]);
        if (transferamount <= 1) return message.channel.send("Vous ne pouvez rien déposer en dessous de 1.");
        if (isNaN(transferamount)) return message.channel.send("Il n'y a aucun nombre valide.");
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.nend("Vous n'avez aucun argent à déposer, commencez par parler.")
                if (row.cash < transferamount) return message.channel.send("Vous n'avez pas autant d'argent à déposer, vous avez: $" + row.cash);
                sql.run(`UPDATE profiles SET cash = ${row.cash -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                sql.run(`UPDATE profiles SET bank = ${row.bank += transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("J'ai déposé avec succès $" + transferamount + " sur votre compte, Nouveau solde: $" + row.cash + ".")
            })
}
