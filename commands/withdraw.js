const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        let transferamount = parseInt(args[0]);
        if (transferamount <= 1) return message.channel.send("Vous ne pouvez rien retirer en dessous de 1.");
        if (isNaN(transferamount)) return message.channel.send("Ce n'est pas un nombre valide à retirer.");
        let taxtransfer = (transferamount / 100) * 95;
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.nend("Vous n'avez pas d'argent en banque à retirer, vous devez d'abord commencer à parler.")
                if (row.bank < transferamount) return message.channel.send("Vous n'avez pas autant d'argent à retirer, vous avez: $" + row.bank);
                sql.run(`UPDATE profiles SET cash = ${row.cash += taxtransfer} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                sql.run(`UPDATE profiles SET bank = ${row.bank -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("J'ai retiré $" + taxtransfer + " avec succès, de votre banque. Il y avait des frais de 5%. Votre nouveau solde: $" + row.cash + ".")
            })
}
