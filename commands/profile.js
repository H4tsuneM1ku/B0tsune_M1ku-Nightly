const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
        if (!row2) return;
        if (row2.levelsystem === "disabled") return message.channel.send("Le système de niveau a été désactivé sur ce serveur.");
        if (message.mentions.users.size < 1) {
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                
                /*let curxp = row.xp;
                let curlvl = row.level;
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                if (!row) {
                    message.channel.send("Vous devez d'abord commencer à parler!")
                }
                    const embed = new Discord.RichEmbed()
                        .setColor(0x7700cf)
                        .setTitle(" Profil de: " + message.author.username + " ")
                        .setThumbnail(message.author.avatarURL)
                        .addField("Votre niveau actuel: ", row.level)
                        .addField("XP total: ", row.xp + "XP")
                        .addField("Banque: ", "$" + row.bank)
                        .addField("Argent: ", "$" + row.cash)
                        .addField("Rep:", row.rep)
                        .addField("Récompenses: ", row.awards);
                    message.channel.send(embed)
            })
        } else if (message.content.includes("<@" + client.user.id +">") || message.content.includes("<@!" + client.user.id +">")) {
               /* let curxp = row.xp;
                let curlvl = row.level
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle(" Profil de: " + client.user.username + " ")
                    .setThumbnail(client.user.avatarURL)
                    .addField("Niveau actuel: ", "1000")
                    .addField("XP total: ", "1395434567276XP")
                    .addField("Banque: ", "$" + "9324432")
                    .addField("Argent: ", "$" + "1657562386")
                    .addField("Rep:", "102")
                    .addField("Récompenses: ", ":tada: :medal: :military_medal: :trophy: :tools: :tophat: :spy::skin-tone-1: :moneybag: :first_place: :credit_card: :watch:");
                message.channel.send(embed)
        } else {
            let user = message.mentions.users.first();
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
               /* let curxp = row.xp;
                let curlvl = row.level
                let nxtLVL = curlvl * 200;
                let dif = nxtLVL - curxp; */
                if (!row) return message.channel.send("L'utilisateur doit d'abord commencer à parler.")
                const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle(" Profile info For: " + user.username + " ")
                    .setThumbnail(user.avatarURL)
                    .addField("Niveau actuel: ", row.level)
                    .addField("XP total: ", row.xp + "XP")
                    .addField("Banque: ", "$" + row.bank)
                    .addField("Argent: ", "$" + row.cash)
                    .addField("Rep:", row.rep)
                    .addField("Récompenses: ", row.awards);
                message.channel.send(embed)
            })
        }
    })
}