const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    const embed = new Discord.RichEmbed()
                    .setDescription('Are you sure you want to shut me down?')
                    .setColor(0x00fdcc);

    let confirmation = await message.channel.send({embed});
  
    const ownerID = "258394351628058636"
    const collector = confirmation.channel.createMessageCollector(m => bot.credentials.ownerID.includes(m.author.id) && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no')),
      {
        time: 30 * 1000,
        maxMatches: 1
      }
    );
  
    collector.on('collect', async answer => {
      if (answer.content.toLowerCase().startsWith('yes')) {
        await message.channel.send({
          embed: {
            description: 'GoodBye :wave:! See you soon.'
          }
        });
  
        if (bot.shard) {
          await bot.shard.broadcastEval('this.destroy().then(() => process.exitCode = 0)');
        }
        else {
          await bot.destroy();
          process.exitCode = 0;
          setTimeout(() => {
            process.exit(0);
          }, 5000);
        }
  
        bot.log.console('\n');
        bot.log.info('GoodBye! See you next time.');
      }
      else {
        await message.channel.send({
          embed: {
            description: 'Cool! I\'m here.'
          }
        });
      }
    });
  };