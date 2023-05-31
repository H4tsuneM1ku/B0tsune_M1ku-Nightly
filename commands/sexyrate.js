const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const sexyrate = Math.floor(Math.random() * 100)
       const embed = new Discord.RichEmbed()
            .addField(":heart_decoration: Sexy Rate :heart_decoration: ", "Je vous donne un " + sexyrate + " sur 100 sur l'échelle de la sexytude.")
            .setThumbnail(message.author.displayAvatarURL)
            .setColor(0x7700cf)
       message.channel.send({embed})
}