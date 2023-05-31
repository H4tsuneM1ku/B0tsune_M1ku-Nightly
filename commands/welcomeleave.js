const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You're missing MANAGE_GUILD permission");
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     const prefixtouse = row.prefix
     const embed10 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setThumbnail(client.user.avatarURL)
        .setTitle("Commande: " + prefixtouse + "welcomeleave")
	    .addField("Utilisation", prefixtouse + "welcomeleave [chiffre] [texte]")
        .addField("Options", "[1] - Activer les messages de bienvenue/adieu\n[2] - Désctiver les messages de bienvenue/adieu\n[3] - Définir le salon de bienvenue/niveau\n[4] - Définir le message de bienvenue\n[5] - Définir le message d'adieu\n[6] - Activer les messages privés de bienvenue/adieu\n[7] - Désactiver les messages privés de bienvenue/adieu\n")
        .addField("Titres", "%MENTION% - Mentionnera l’utilisateur.\n%GUILDNAME% - Dira le nom du serveur.\n%NAME% - Dira le nom des utilisateurs.\n%MEMBERCOUNT% - Dira le compte de membre actuel")
        .addField("Exemple", prefixtouse + "welcomeleave 3 Welcome to %GUILDNAME%, %MENTION% has joined us.")
        .setDescription("Description: " + "Utilisé pour définir le système d’accueil/congé.");

        const numberpicked = parseInt(args[0])
        const newsomething = args.slice(1).join(' ');
        if (isNaN(numberpicked)) return message.channel.send(embed10)
        if (numberpicked === 1) {
            if (row.wlsystem === "enabled") return message.channel.send("Les messages de bienvenue/adieu ont déjà été activés.")
            sql.run(`UPDATE scores SET wlsystem = "enabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai activé les messages de bienvenue/adieur pour ce serveur.")
        } else if (numberpicked === 2) {
            if (row.wlsystem === "disabled") return message.channel.send("Les messages de bienvenue/laisser ont déjà été désactivés")
            sql.run(`UPDATE scores SET wlsystem = "disabled" WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai désactivé les messages de bienvenue/adieu pour ce serveur.")
        } else if (numberpicked === 3) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newwlchannelfix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Vous n’avez pas fourni de nouveau salon à définir")
            if (newwlchannelfix.length < 1) return message.channel.send("Le salon ne peut pas avoir des caractères non-ascii")
            if (newsomething.length > 25) return message.channel.send("Le salon ne peut pas être plus long que 25 caractères")
            sql.run(`UPDATE scores SET wlchannel = "${newwlchannelfix}", casenumber = ${row.casenumber +1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai mis le nouveau salon de bienvenue du serveur sur " + newwlchannelfix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Cas #" + row.casenumber + " | Action: Salon de bienvenue changé")
                .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                .addField("Nouveau Salon", newwlchannelfix, true)
                .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
             client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 4) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newwelcomemessagefix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Vous n’avez pas fourni de nouveau message à définir")
            if (newwelcomemessagefix.length < 1) return message.channel.send("Le message de bienvenue ne peut pas avoir des caractères non-ascii")
            if (newsomething.length > 400) return message.channel.send("Le message de bienvenue ne peut pas faire plus de 400 caractères")
            sql.run(`UPDATE scores SET welcomemessage = "${newwelcomemessagefix}", casenumber = ${row.casenumber +1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai défini le nouveau message de bienvenue du serveur sur " + newwelcomemessagefix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Cas #" + row.casenumber + " | Action: Message de bienvenue changé")
                .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                .addField("Nouveau Message", newwelcomemessagefix, true)
                .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 5) {
            if (newsomething < 1) return message.channel.send(embed10)
            const newleavemessagefix = newsomething.replace(/[^\x00-\x7F]/g, "");
            if (newsomething.length < 1) return message.channel.send("Vous n’avez pas fourni de nouveau message à définir")
            if (newleavemessagefix.length < 1) return message.channel.send("Le message d'adieu ne peut pas avoir des caractères non-ascii")
            if (newsomething.length > 400) return message.channel.send("Le message d'adieu ne peut pas faire plus de 400 caractères")
            sql.run(`UPDATE scores SET leavemessage = "${newleavemessagefix}", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai défini le nouveau message d'adieu du serveur sur " + newleavemessagefix)
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Cas #" + row.casenumber + " | Action: Message d'adieu changé")
           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
           .addField("Nouveau Message", newleavemessagefix, true)
           .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 6) {
            sql.run(`UPDATE scores SET dmmessage = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J’ai fait pour que les messages de bienvenue / adieu aillent en dms.")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Cas #" + row.casenumber + " | Action: Bienvenue/adieu en dms")
           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
           .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else if (numberpicked === 7) {
            sql.run(`UPDATE scores SET dmmessage = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
            message.channel.send("J'ai fait pour que les messages de bienvenue / adieu aillent dans ce salon")
            let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
             const embed = new Discord.RichEmbed()
           .setColor(0x00A2E8)
           .setTitle("Cas #" + row.casenumber + " | Action: Bienvenue/adieu en dms")
           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
           .setFooter("Date d'utilisation: " + message.createdAt.toDateString())
             if (!modlog) return;
             if (row.logsenabled === "disabled") return;
           client.channels.get(modlog.id).send({embed});
        } else {
            message.channel.send("Vous n'avez pas sélectionné d'option valide")
        }
    })
}
