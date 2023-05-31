exports.run = async (client, message, args) => {
    message.delete()
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setImage('https://i.imgur.com/CY38lMl.gif');
    message.channel.send({embed})
}