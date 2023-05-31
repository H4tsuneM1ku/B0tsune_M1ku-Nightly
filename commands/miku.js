const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');

exports.run = (bot, message, args) => {

    const subreddits = [
        "hatsune",
        "hatsunemiku",
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setAuthor("MIKU-CHAN ! ♥")
                    .setColor(0x00fdcc)
                    .setImage(url)
                    .setFooter("Hatsune Miku • Powered by Reddit")
                message.channel.send({embed});
        })
}