const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_ROLES. :x:')
     if (message.member.hasPermission("MANAGE_ROLES")) {
         sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
            const prefixtouse = row.prefix
            const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "createrole")
            .addField("Utilisation", prefixtouse + "createrole <nom> <couleur>")
            .addField("Exemple", prefixtouse + "createrole Mods 0x0F01A0")
            .setDescription("Description: " + "Crée un nouveau rôle dans le serveur actuel");

            let guild = message.member.guild;
            let rolename = args[0]
            let color2 = args[1] || `FFFFFF`;
            let reason = args[2] || `Le modérateur n'a pas donné de raison.`;
            console.log(rolename + " | " + color2 + " a été créé")
            if (rolename.length < 1) return message.channel.send(usage)
            if (color2.length < 1) return message.channel.send(usage)
            guild.createRole({
                name: `${rolename}`,
                color: `${color2}`
            });
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
            message.reply("J'ai créé le rôle: " + rolename + " avec la couleur: " + color2);
            sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            const embed = new Discord.RichEmbed()
             .setColor(0x7700cf)
             .setTitle("Casier #" + row.casenumber + " | Action: Créé un rôle")
             .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
             .addField("Utilisateur", user.user.tag + " (ID: " + user.user.id + ")")
             .addField("Dans le channel", message.channel.name, true)
             .addField("Raison", reason, true)
             .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
         })
    }
}
   
