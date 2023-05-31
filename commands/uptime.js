const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, message, args) => {
  try {
    const embed = new Discord.RichEmbed()
      .setTitle("Temps de fonctionnement du bot")
      .addField('Disponibilité:', moment.duration(client.uptime).format('d [jours], h [heures], m [minutes], s [seconds]', { trim: "small" }), true)
      .setColor(0x7700cf)
     message.channel.send(embed)
  } catch (err) {
      message.channel.send(`Oh non, une erreur est survenue: \`${err.message}\`. Essayez encore plus tard!`);
  }
}
