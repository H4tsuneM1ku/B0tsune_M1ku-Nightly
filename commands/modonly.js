const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        if (row.modonlycommands === "disabled") {
            sql.run(`UPDATE scores SET modonlycommands = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("Dorénavant uniquement les mods/mods+ peuvent utiliser les commandes du bot.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Casier #" + row.casenumber + " | Action: Commandes Mod-Only Activées")
                .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            return client.channels.get(modlog.id).send({embed});
        } else {
            sql.run(`UPDATE scores SET modonlycommands = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("Dorénavant tout le monde peut utiliser les commandes du bot.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Casier #" + row.casenumber + " | Action: Commandes Mod-Only Désactivées")
                .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            return client.channels.get(modlog.id).send({embed});
        }
    })
}
