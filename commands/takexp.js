const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) return message.channel.send("Vous devez mentionner un utilisateur pour lui prendre de l'XP.");
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Vous n'avez pas donné de montant d'XP à retirer.");
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Vous avez besoin de la permission MANAGE_GUILD pour utiliser cette commande.")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("L'utilisateur doit d'abord commencer à parler.")
        if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
        sql.run(`UPDATE profiles SET xp = ${row.xp -= amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
		message.channel.send("J'ai pris de l'XP à: " + user.username + " " + amount + "XP");
    })
}
