const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const embed2 = new Discord.RichEmbed()
    .setColor(0x7700cf) 
    .setTitle(" Récompenses Possibles ")
    .addField(`:tada: - Atteindre le niveau 25`, ` + 5,000 fonds`, true)
    .addField(`:medal: - Atteindre le niveau 50`, `+ 10,000 fonds`, true)
    .addField(`:military_medal: - Atteindre le niveau 75`, `+ 20,000 fonds`, true)
    .addField(`:trophy:`, `Atteindre le niveau 100 (max)`, true)
    .addBlankField()
    .addField(`:first_place: - Être #1 sur le classement`, `+5% chances de gagner`, false)
    .addField(`:moneybag:`, `Gagner 10,000 d'argent. +1% chances de gagner`, true)
    .addField(`:credit_card:`, `Gagner 100,000 d'argent. +3% chances de gagner`, true)
    .addBlankField()
    .addField(`:spy::skin-tone-1:`, `Récompense Secrète`, true)
    .addField(`:tophat: - Récompense Secrète`, ` +`, true)
    .addField(`:watch:`, `Récompense Secrète`, true)
    .addField(`:tools:`, `Récompense Secrète`, true)
    message.channel.send(embed2) 
}
   
