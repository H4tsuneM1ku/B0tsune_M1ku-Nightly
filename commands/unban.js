const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "unban")
            .addField("Utilisation", prefixtouse + "unban <ID> <raison>")
            .addField("Exemple", prefixtouse + "unban 130515926117253122 a demandé une seconde chance.")
            .setDescription("Description: " + "Déban un utilisateur du serveur actuel.");

      if (message.member.hasPermission("BAN_MEMBERS")) {
     if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission BAN_MEMBERS. :x:')
     let user = args[0]
     if (isNaN(user)) return message.channel.send(usage)
     let reason = args.slice(1).join(' ') || `Le modérateur n'a pas donné de raison.`;
     let modlog = message.guild.channels.find('name', row.logschannel);
     if (reason.length < 1) return message.channel.send(usage)
     if (!user) return message.channel.send(usage)
     if (user === message.author.id) return message.channel.send(`:x: Eh bien non vous ne pouvez pas vous débannir.`);
	   if (message.guild.members.get(user)) return message.channel.send(`:x: Cet utilisateur n'est pas banni du serveur.`);
     message.guild.unban(user, 2);
     sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Unban")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("ID:", user)
    .addField("Raison", reason, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
     message.channel.send("L'utilisateur a été débanni du serveur.")
     if (!modlog) return;
     if (row.logsenabled === "disabled") return;
     client.channels.get(modlog.id).send({embed})
       }
    })
}