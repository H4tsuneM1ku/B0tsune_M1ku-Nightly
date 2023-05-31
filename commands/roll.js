const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
        const value = parseInt(args.join(" "));
        if (isNaN(value)) return message.channel.send("Ce n'est pas un nombre valide à rouler.")
        if (!isFinite(value)) return message.channel.send("Je ne peux pas faire rouler l'infini.")
        isFinite
        const roll = Math.floor(Math.random() * value) + 1;
        const embed = new Discord.RichEmbed()
        .addField("Le dé a roulé", roll)
        .setColor(0x7700cf)
        message.channel.send({embed})
}
