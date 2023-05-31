const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
         if (row.levelsystem === "disabled") {
            sql.run(`UPDATE scores SET levelsystem = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J'ai activé les niveaux/xp/argent sur ce serveur")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
               .setColor(0x00A2E8)
               .setTitle("Cas #" + row.casenumber + " | Action: Système de profil activé")
               .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
               .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           return client.channels.get(modlog.id).send({embed}).catch(console.error);
         } else {
            sql.run(`UPDATE scores SET levelsystem = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J'ai désactivé les niveaux/xp/argent sur ce serveur")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
               .setColor(0x00A2E8)
               .setTitle("Cas #" + row.casenumber + " | Action: Système de profil désactivé")
               .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
               .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           return client.channels.get(modlog.id).send({embed}).catch(console.error);
         }
    })
}
