const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const prefix = ("n.")
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Il vous manque la permission BAN_MEMBERS pour DM cet utilisateur avec le bot.`)
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix
    const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "dm")
            .addField("Utilisation: ", prefixtouse + "dm @Someone <message>")
            .addField("Exemple: ", prefixtouse + "dm @Zdradamus#9999 Hey tu peux m'aider avec quelque chose?")
            .setDescription("Description: " + "Le bot envoie un message priv�contenant votre message � un utilisateur.");
  
            try {
            let who = message.mentions.users.first()
            if (message.mentions.users.size < 1) return message.channel.send(usage);
            if (message.author.id == who.id) return message.channel.send(`:x: Eh bien non, vous ne pouvez pas vous DM vous-même.`);
            message2 = args.slice(1).join(` `);
            if (message2 >= 400) return message.channel.send(usage)
                who.send('**Message de ' + message.author.username + '**: ' + message2)
                    message.channel.send(`Message envoyé avec succès à **${who.username}**. Contenu du message: **${message2}**`)
            } catch (err) {
                return;
            }
            })
    }         
   
