const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
     const newprefix = args.join(" ")
     const newprefixfix = newprefix.replace(/[^\x00-\x7F]/g, "");
     if (newprefix.length < 1) return message.channel.send("Vous n'avez pas fourni de nouveau préfixe à définir.")
     if (newprefixfix.length < 1) return message.channel.send("Le préfixe ne peut pas avoir de caractères ASCII.")
     if (newprefix.length > 7) return message.channel.send("Le préfixe ne peut pas être plus long que 7 caractères")
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     sql.run(`UPDATE scores SET prefix = "${newprefixfix}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     message.channel.send("J’ai défini le nouveau préfixe du serveur sur " + newprefix)
     let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Cas #" + row.casenumber + " | Action: Prefix Change")
        .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
        .addField("Nouveau préfixe", newprefixfix, true)
        .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
      if (!modlog) return;
      if (row.logsenabled === "disabled") return;
    return client.channels.get(modlog.id).send({embed});
    })
}