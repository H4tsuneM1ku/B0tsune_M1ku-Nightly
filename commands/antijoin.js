const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (message.member.hasPermission("BAN_MEMBERS")) {
         sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
            const reason = args.join(" ") || `Le modérateur n'a pas donné de raison.`;
            if (row.antijoin === "disabled") {
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1}, antijoin = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("Anti-join a été activé.")
            const embed = new Discord.RichEmbed()
             .setColor(0x00A2E8)
             .setTitle("Cas #" + row.casenumber + " | Action: Anti Join on")
             .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("Dans le salon", message.channel.name, true)
             .addField("Raison", reason, true)
             .setFooter("Temps écoulé: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
            } else {
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1}, antijoin = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("Anti-join has been disabled.")
            const embed = new Discord.RichEmbed()
             .setColor(0x00A2E8)
             .setTitle("Cas #" + row.casenumber + " | Action: Anti Join off")
             .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("Dans le salon", message.channel.name, true)
             .addField("Raison", reason, true)
             .setFooter("Temps écoulé: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed}).catch(console.error);
            }
         })
    }
}
   
