const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Vous avez besoin de la permission MANAGE_GUILD pour utiliser cette commande. :x:")
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) {
        const amount = parseInt(args[0]);
        if (amount < 1) return message.channel.send("Vous n’avez pas fourni d’argent à donner.");
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row2 => {
            if (!row2) message.channel.send("Vous devez d'abord commencer à parler.")
            const doingmath = row2.cash + row2.bank
               if (doingmath >= 999999) return message.channel.send("Le montant maximum est $999999.")
               if (amount >= 999999) return message.channel.send("Le montant maximum à donner est $999999.")
               if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
               sql.run(`UPDATE profiles SET cash = ${row2.cash += amount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
               message.channel.send("J'ai donné de l'argent à: " + message.author.username + " $" + amount);
        })
     } else {
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Vous n’avez pas fourni d’argent à donner.");
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("L'utilisateur à besoin de parler en premier.")
     const doingmath = row.cash + row.bank
        if (doingmath >= 999999) return message.channel.send("Le montant maximum est $999999.")
        if (amount >= 999999) return message.channel.send("Le montant maximum à donner est $999999.")
        if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
        sql.run(`UPDATE profiles SET cash = ${row.cash += amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
        message.channel.send("J'ai donné de l'argent à: " + user.username + " $" + amount);
        })
    }
}
