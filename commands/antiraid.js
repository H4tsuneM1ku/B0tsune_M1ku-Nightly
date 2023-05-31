const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
 if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Désolé, vous n'avez pas les permissions pour exécuter la commande antiraid.");
  if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_CHANNELS. :x:')
  const ms = require('ms');
  if (!client.lockit) client.lockit = [];
  const time = args.join(' ');
  const validUnlocks = ['libérer', 'débloquer', 'déverrouiller', 'stop', 'off'];
  if (!time) return message.reply("vous devez définir une durée de confinement en heures, minutes ou secondes, exprimé en ms.\nExemple: `n.antiraid 1000` pour une seconde, `n.antiraid 83000000` pour 24 heures.");

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send('Verrouillage levé.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Channel verrouillé pour ${ms(ms(time), { long:true })}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
          }).then(message.channel.send('Verrouillage levé.'))
          delete client.lockit[message.channel.id];
        }, ms(time));
      }).catch(error => {
        console.log(error);
      });
    });
  }
}
   
