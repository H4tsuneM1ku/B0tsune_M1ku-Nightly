const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
     if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_MESSAGES. :x:')
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
         if (row.slowmode === "enabled") {
             sql.run(`UPDATE scores SET slowmode = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
             message.channel.send("Le slowmode a été désactivé.")
                  let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle("Casier #" + row.casenumber + " | Action:  Slow Mode Désactivé")
                    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});
                } else {
                    const timetoset = parseInt(args[0])
                    const prefixtouse = row.prefix
                    const usage = new Discord.RichEmbed()
                        .setColor(0x7700cf)
                        .setThumbnail(client.user.avatarURL)
                        .setTitle("commande: " + prefixtouse + "slowmode")
                        .addField("Utilisation", prefixtouse + "slowmode <secondes>")
                        .addField("Exemple", prefixtouse + "slowmode 5")
                        .setDescription("Description: " + "Active le slowmode sur le serveur actuel et les utilisateurs ne pourront envoyer des messages que tous les x secondes.");

                    if (isNaN(timetoset)) return message.channel.send(usage)
                    if (timetoset.length < 1) return message.channel.send(usage)
                    sql.run(`UPDATE scores SET slowmode = "enabled", slowmodetime = ${timetoset}, casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                     message.channel.send("Le slowmode a été activé avec un temps de " + timetoset + " secondes")
                      let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle("Casier #" + row.casenumber + " | Action:  Slow Mode Enabled")
                    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                    .addField("Time", timetoset, true)
                    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});

         }
    })
}