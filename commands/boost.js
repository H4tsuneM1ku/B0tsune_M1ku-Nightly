const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (message.mentions.users.size < 1) return message.channel.send("Le booster est introuvable ou n'a pas été mentionné.");
    message.delete()
    let user = message.mentions.users.first()
    const embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}#${user.discriminator} a boosté le serveur !`)
        .setThumbnail(user.avatarURL)
        .setDescription(`Merci beaucoup à toi d'avoir boosté le serveur ! Tu fais désormais partie de nos héros légendaires !`)
        .setImage(`https://i.imgur.com/cWEk4Fh.gif`)
        .setColor("#F47FFF")
    message.channel.send(embed)

}