const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (message.mentions.users === message.author.username) return message.reply('Vous ne pouvez pas vous clasher vous-même');
    if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner quelqu\'un à clasher.')
    var roast = [
    "J'accepte ! Je suis chaud ! T'as accepté mes règles, donc ça va être avec mes règles. Normalement mes règles c'est qu'il n'y a pas de règles, mais on va faire MMA, avec ou sans arbitre je sais pas encore. Tous les coups seront permis."
]
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription(user.username + ", " + roast);
    message.channel.send({embed})
  }