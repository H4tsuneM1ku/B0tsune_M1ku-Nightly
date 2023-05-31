const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {

  const prefixtouse = row.prefix
        const embed10 = new Discord.RichEmbed()
                .setColor(0x7700cf)
                .setThumbnail(client.user.avatarURL)
                .setTitle("Commande: " + prefixtouse + "logs")
                .addField("Utilisation", prefixtouse + "logs [chiffre]")
                .addField("Exemple", "[1] - Activer les logs\n[2] - Désactiver les logs\n[3] - Changer le channel de logs")
                .setDescription("Description: " + "Utilisé pour configurer les logs de modération du bot.");

        const toenable = args[0]
        if (toenable === "1") {
            sql.run(`UPDATE scores SET logsenabled = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("J'ai activé les logs pour ce serveur.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
          .setColor(0x7700cf)
          .setTitle("Casier #" + row.casenumber + " | Action: Logs Enabled")
          .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
          .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            client.channels.get(modlog.id).send({embed});
        } else if (toenable === "2") {
            sql.run(`UPDATE scores SET logsenabled = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("J'ai désactivé les logs pour ce serveur.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            const embed = new Discord.RichEmbed()
          .setColor(0x7700cf)
          .setTitle("Casier #" + row.casenumber + " | Action: Logs Disabled")
          .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
          .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
            if (!modlog) return;
            if (row.logsenabled === "disabled") return;
            client.channels.get(modlog.id).send({embed});
        } else if (toenable === "3") {
          const newlogs = args.slice(1).join(' ')
          const newlogschannel = newlogs.replace(/[^\x00-\x7F]/g, "");
          if (newlogs.length < 1) return message.channel.send("Vous n'avez pas donné de nom de channel à définir.")
          if (newlogschannel.length < 1) return message.channel.send("Le préfixe ne peut pas avoir de caractères non-ASCII.")
          if (newlogs.length > 20) return message.channel.send("Le nom du channel ne peut pas être supérieur à 20 caractères.")
          if (!row.logschannel) return;
          sql.run(`UPDATE scores SET logschannel = "${newlogschannel}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
          message.channel.send("J'ai défini le channel de logs du serveur sur " + newlogschannel)
          let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
           const embed = new Discord.RichEmbed()
         .setColor(0x7700cf)
         .setTitle("Casier #" + row.casenumber + " | Action: Logs Channel Change")
         .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
         .addField("Nouveau channel logs", newlogschannel, true)
         .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
           if (!modlog) return;
           if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else {
           message.channel.send(embed10)
        }
    })
}
