const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    const embed = new Discord.RichEmbed()
                    .setDescription('Bleh bleh ?')
                    .setColor(0x00fdcc);

    let confirmation = await message.channel.send({embed});
  
    const collector = confirmation.channel.createMessageCollector(m => m.content.toLowerCase().startsWith('bleh') || m.content.toLowerCase().startsWith('tg'),
      {
        time: 30 * 1000,
        maxMatches: 1
      }
    );
  
    collector.on('collect', async answer => {
      if (answer.content.toLowerCase().startsWith('bleh')) {
        await message.channel.send({
          embed: {
            description: 'Bleh !! :heart_eyes:'
          }
        });
      }
      else if (answer.content.toLowerCase().startsWith('tg')) {
        await message.channel.send({
          embed: {
            description: ':('
          }
        });
     } else {
        await message.channel.send({
          embed: {
            description: 'Cool! I\'m here.'
          }
        });
      }
    });
  };