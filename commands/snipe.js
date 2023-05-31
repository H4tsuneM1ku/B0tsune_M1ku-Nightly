const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    const msg = client.user.cache.get(message.channel.id);
    if (!msg) return message.reply("Il n'y a aucun message supprimé récemment !");

    const embed = new MessageEmbed()
        .setAuthor(`Supprimé par ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription(msg.content);

    if (msg.image) embed.setImage(msg.image);

    message.channel.send(embed);
}