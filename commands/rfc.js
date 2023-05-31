const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
exports.run = async (client, message, args) => {

    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription("__**- La première règle du Fight Club est :**__ il est interdit de parler du Fight Club.\n\n__**- La seconde règle du Fight Club est :**__ il est interdit de parler du Fight Club.\n\n__**- Troisième règle du Fight Club :**__ quelqu'un crie stop, quelqu'un s'écroule ou n'en peut plus, le combat est terminé.\n\n__**- Quatrième règle :**__ seulement deux hommes par combat.\n\n__**- Cinquième règle :**__ un seul combat à la fois.\n\n__**- Sixième règle :**__ pas de chemise, ni de chaussures.\n\n__**- Septième règle :**__ les combats continueront aussi longtemps que nécessaire.\n\n__**- Huitième et dernière règle :**__ si c'est votre première soirée au Fight Club, vous devez vous battre.");
    message.channel.send({embed})
  }