const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    let autogoogle = args.join('+');
    if (autogoogle.length < 1) return message.reply('Vous devez donner un mot à LMGTFY-er.').catch(console.error);
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription(`Et voilà, **${message.author.username}**: http://lmgtfy.com/?q=` + (args.join('+')))
    message.channel.send({embed})
}
   
