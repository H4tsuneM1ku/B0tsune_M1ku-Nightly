const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission ADD_REACTIONS. :x:')
    const superagent = require('superagent');
    const { body } = await superagent
        .get('http://www.rrrather.com/botapi');
    const embed = new Discord.RichEmbed()
        .setTitle(`${body.title} Choix A ou B?`)
        .setURL(body.link)
        .setColor(0x7700cf)
        .setDescription(`${body.choicea} OU ${body.choiceb}?`);
    message.channel.send({embed}).then(m => {
        m.react('🅰');
        m.react('🅱');
    });
}
