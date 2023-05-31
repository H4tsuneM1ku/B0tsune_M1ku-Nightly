const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
     if (message.mentions.users.size < 1) return message.channel.send("Vous devez mentionner quelqu'un pour lui prendre de l'argent.");
     const amount = parseInt(args[1]);
     if (amount < 1) return message.channel.send("Vous n'avez pas donné le montant d'argent à prendre.");
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Vous avez besoin de la permission MANAGE_GUILD pour utiliser cette commande.")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
     if (!row) message.channel.send("L'utilisateur doit d'abord commencer à parler.")
        if (isNaN(amount)) return message.channel.send("Ce n'est pas un nombre valide.")
        sql.run(`UPDATE profiles SET cash = ${row.cash -= amount} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
		message.channel.send("J'ai pris de l'argent à: " + user.username + " $" + amount);
    })
}
