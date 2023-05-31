exports.run = async (bot, message, args) => {
    if (message.mentions.users.size < 1) return message.channel.send(`Attention ${message.author.username}, vous n'avez pas mentionné le poti blagueur !`)
    let user = message.mentions.users.first();
            const url= `https://i.imgur.com/iWZe70l.png`
            const embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}, quel poti blagueur`)
                    .setColor(0x7700cf)
                    .setImage(url)
                message.channel.send({ embed });
};