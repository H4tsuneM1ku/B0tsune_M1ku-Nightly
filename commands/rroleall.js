const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Il vous manque la permission MANAGE_ROLES")
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        var userz = message.guild.members.array();
        const roletogive = args.join(" ")
        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
        let subscriberRole = client.guilds.get(message.guild.id).roles.find(r => r.name == roletogive);
        if (!subscriberRole) return message.channel.send("Je ne trouve pas le rôle " + roletogive + " :x:");

        if (row.logsenabled === 'disabled') {
            try {
                userz.forEach(u => {
                    u.removeRole(subscriberRole)
                })
                message.channel.send("J'ai repris le rôle " + roletogive + " à tout les membres.")
               return client.channels.get(modlog.id).send({embed});
            } catch (err) {
                return;
            }
        } else {
    sql.run(`UPDATE scores SET logsenabled = "disabled" WHERE guildId = ${message.guild.id}`);
    try {
        userz.forEach(u => {
            u.removeRole(subscriberRole)
        })
        message.channel.send("J'ai repris le rôle " + roletogive + " à tout les membres.")
        const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Casier #" + row.casenumber + " | Action: Remove Role All")
            .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
            .addField("Rôle repris:", roletogive)
            .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
   if (!modlog) return;
   sql.run(`UPDATE scores SET logsenabled = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
     return client.channels.get(modlog.id).send({embed});
    } catch (err) {
        return;
    }
}
    })
}
