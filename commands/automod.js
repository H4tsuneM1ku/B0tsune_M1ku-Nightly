const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Il vous manque la permission MANAGE_GUILD");
    if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.reply('Désolé, je ne peux pas éxécuter cette commande. Il me manque la permission MANAGE_MESSAGES. :x:')
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
        const prefixtouse = row.prefix
        const embed10 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setThumbnail(client.user.avatarURL)
                .setTitle("Commande: " + prefixtouse + "automod")
                .addField("Utilisation", prefixtouse + "automod [enable/disable] [antiinvite/antiweblink/antidupcharacters]")
                .addField("Example", prefixtouse + "automod enable antiinvite")
                .setDescription("Description: " + "Active/désactive l'automodération du bot.");

        const toenable = args[0]
        const thingtoenable = args.slice(1).join(` `);
        if (toenable < 1) return message.channel.send(embed10)
        if (thingtoenable < 1) return message.channel.send(embed10)

                if (toenable === "enable" && thingtoenable === "antiinvite") {
                       sql.run(`UPDATE scores SET automoderation = "enabled", invitelinkprotection = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                       message.channel.send("L'automodération avec anti invite à été activée pour ce serveur.")
                       let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                       const embed = new Discord.RichEmbed()
                           .setColor(0x00A2E8)
                           .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Enabled")
                           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                           .addField("Outil Auto Mod", "Anti Invite")
                           .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                           if (!modlog) return;
                           if (row.logsenabled === "disabled") return;
                           client.channels.get(modlog.id).send({embed});
                } else if (toenable === "enable" && thingtoenable === "antiweblink") {
                       sql.run(`UPDATE scores SET automoderation = "enabled", websitelinkprotection = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                       message.channel.send("L'automodération avec anti liens internet à été activée pour ce serveur.")
                       let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                       const embed = new Discord.RichEmbed()
                           .setColor(0x00A2E8)
                           .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Enabled")
                           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                           .addField("Outil Auto Mod", "Anti Website Link")
                           .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                           if (!modlog) return;
                           if (row.logsenabled === "disabled") return;
                           client.channels.get(modlog.id).send({embed});
                } else if (toenable === "enable" && thingtoenable === "antidupcharacters") {
                       sql.run(`UPDATE scores SET automoderation = "enabled", dupcharactersprotection = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                       message.channel.send("L'automodération avec anti duplication à été activée pour ce serveur.")
                       let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                       const embed = new Discord.RichEmbed()
                           .setColor(0x00A2E8)
                           .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Enabled")
                           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                           .addField("Outil Auto Mod", "Anti Duplicate Characters")
                           .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                           if (!modlog) return;
                           if (row.logsenabled === "disabled") return;
                           client.channels.get(modlog.id).send({embed});
                } else if (toenable === "enable" && thingtoenable === "all") {
                       sql.run(`UPDATE scores SET automoderation = "enabled", invitelinkprotection = "enabled", websitelinkprotection = "enabled", dupcharactersprotection = "enabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                       message.channel.send("Toutes les automodérations ont été activées pour ce serveur.")
                       let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                       const embed = new Discord.RichEmbed()
                           .setColor(0x00A2E8)
                           .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Enabled")
                           .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                           .addField("Outil Auto Mod", "All")
                           .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                           if (!modlog) return;
                           if (row.logsenabled === "disabled") return;
                           client.channels.get(modlog.id).send({embed});
                } else if (toenable === "disable" && thingtoenable === "antiinvite") {
                   sql.run(`UPDATE scores SET automoderation = "enabled", invitelinkprotection = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                   message.channel.send("L'automodération avec anti invite à été désactivée pour ce serveur.")      
                   let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                   const embed = new Discord.RichEmbed()
                       .setColor(0x00A2E8)
                       .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Disabled")
                       .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                       .addField("Outil Auto Mod", "Anti Invite")
                       .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                   if (!modlog) return;
                   if (row.logsenabled === "disabled") return;
                   client.channels.get(modlog.id).send({embed});
                } else if (toenable === "disable" && thingtoenable === "antiweblink") {
                   sql.run(`UPDATE scores SET automoderation = "enabled", websitelinkprotection = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                   message.channel.send("L'automodération avec anti liens internet à été désactivée pour ce serveur.")                   
                   let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                   const embed = new Discord.RichEmbed()
                       .setColor(0x00A2E8)
                       .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Disabled")
                       .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                       .addField("Outil Auto Mod", "Anti Website link")
                       .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                   if (!modlog) return;
                   if (row.logsenabled === "disabled") return;
                   client.channels.get(modlog.id).send({embed});
                } else if (toenable === "disable" && thingtoenable === "antidupcharacters") {
                   sql.run(`UPDATE scores SET automoderation = "enabled", dupcharactersprotection = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                   message.channel.send("L'automodération avec anti duplication à été désactivée pour ce serveur.")
                   let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                   const embed = new Discord.RichEmbed()
                       .setColor(0x00A2E8)
                       .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Disabled")
                       .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                       .addField("Outil Auto Mod", "Anti Website link")
                       .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                   if (!modlog) return;
                   if (row.logsenabled === "disabled") return;
                   client.channels.get(modlog.id).send({embed});
                } else if (toenable === "disable" && thingtoenable === "all") {
                   sql.run(`UPDATE scores SET automoderation = "disabled", invitelinkprotection = "disabled", websitelinkprotection = "disabled", dupcharactersprotection = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                   message.channel.send("Toutes les automodérations ont été désactivées pour ce serveur.")
                   let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
                   const embed = new Discord.RichEmbed()
                       .setColor(0x00A2E8)
                       .setTitle("Cas #" + row.casenumber + " | Action:  Auto Mod Disabled")
                       .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
                       .addField("Outil Auto Mod", "All")
                       .setFooter("Temps écoulé: " + message.createdAt.toDateString())
                   if (!modlog) return;
                   if (row.logsenabled === "disabled") return;
                   client.channels.get(modlog.id).send({embed});
                } else {
                    message.channel.send(embed10)
                }
            })
        }
