const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (message.mentions.users === message.author.username) return message.reply('Vous ne pouvez pas vous proposer un octogone.');
    if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner quelqu\'un pour lui proposer un octogone.')
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription(`Ok ${user.username}. Tu me proposes un octogone sans règle ? C'est quand tu veux frère. Mais t'as parlé moi j'ai parlé, j'assume. On attend la date, l'heure, le jour.`);
    message.channel.send({embed})
  }