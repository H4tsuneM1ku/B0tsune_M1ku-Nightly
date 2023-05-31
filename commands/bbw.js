const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Veuillez passer dans un canal NSFW afin d’utiliser cette commande.")

    var subreddits = [
        'BBW',
        'BBWnudists',
        'BBW_Chubby'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setImage(url)
                    .setFooter("Powered by Reddit")
                message.channel.send({ embed });
        })
}