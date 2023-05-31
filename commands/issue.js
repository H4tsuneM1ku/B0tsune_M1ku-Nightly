const Discord = require("discord.js");
const bot = new Discord.Client();
const talkedRecently = new Set();
exports.run = (client, message, args) => {
                        if (talkedRecently.has(message.author.id)) return message.channel.send("Vous avez déjà signalé un problème récemment, veuillez attendre encore 30 minutes.");
                        let feedback = args.join(' ');
                            if (feedback.length < 10) return message.reply('Le retour est trop court. Entrez un minimum de 10 caractères.').catch(console.error);
                        client.users.get("258394351628058636").send("H4tsune, un utilisateur a signalé un problème sur le bot: " + feedback + " | Envoyé par: " + message.author.username);
                            message.reply("merci d’avoir signalé un problème / choisi de donner des commentaires. Le message a bien été envoyé!")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 30 * 60000);
}
