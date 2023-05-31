const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Vous avez besoin de la permission MANAGE_GUILD pour utiliser cette commande. :x:")
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) {
        const amount = parseInt(args[0]);
        if (amount < 1) return message.channel.send("Vous n'avez pas entré d'XP à donner.");
        if (amount >= 9999999) return message.channel.send("Le maximum d'XP à donner est 9999999.")
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row2 => {
            if (!row2) message.channel.send("Vous devez d'abord commencer à parler.")
            if (row2.xp >= 9999999) return message.channel.send("L'XP maximum est 9999999.")
               if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
               sql.run(`UPDATE profiles SET xp = ${row2.xp += amount}, username = "${message.author.username}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
               message.channel.send("J'ai donné de l'XP à: " + message.author.username + " " + amount + "XP");
        })
     } else {
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Vous n'avez pas entré d'XP à donner.");
     if (amount >= 9999999) return message.channel.send("Le maximum d'XP à donner est 9999999.")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("L'utilisateur doit d'abord commencer à parler.")
     if (row.xp >= 9999999) return message.channel.send("L'XP maximum est 9999999.")
        if (amount >= 999999) return message.channel.send("L'XP maximum à donner est 9999999.")
        if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
        sql.run(`UPDATE profiles SET xp = ${row.xp += amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
        message.channel.send("J'ai donné de l'XP à: " + user.username + " " + amount + "XP");
        })
    }
}

