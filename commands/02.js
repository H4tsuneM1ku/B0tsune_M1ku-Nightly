const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');

exports.run = (bot, message, args) => {

    const subreddits = [
        "ZeroTwo",
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setAuthor("Darling~")
                    .setColor(0xFF0000)
                    .setImage(url)
                    .setFooter("Zero Two • Powered by Reddit")
                message.channel.send({ embed });
        })
}