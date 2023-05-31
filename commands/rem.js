const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');

exports.run = (bot, message, args) => {

    const subreddits = [
        "OneTrueRem",
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setImage(url)
                    .setFooter("Rem • Powered by Reddit")
                message.channel.send({ embed });
        })
}