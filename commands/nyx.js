const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
exports.run = async (client, message, args) => {
    var compliment = [
    "La plus belle ♥",
    "La plus gentille ♥",
    "La plus mignonne ♥",
    "La plus adorable ♥",
    "La plus douce ♥",
    "La plus sympathique ♥",
    "La plus réputée ♥",
    "On l'aime ♥"
    ]

    const nyx = compliment[Math.floor(Math.random() * compliment.length)];
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription(nyx)
    message.channel.send({embed})
  }