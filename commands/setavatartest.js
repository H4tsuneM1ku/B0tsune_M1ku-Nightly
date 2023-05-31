const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
if (message.author.id == "258394351628058636") {
  const confirm = new Discord.RichEmbed()
  .setDescription('Vous devez choisir entre les images 1️⃣, 2️⃣, 3️⃣, 4️⃣, 5️⃣ et 6️⃣.')
  .setColor(0x7700cf);
  
  const embed1= new Discord.RichEmbed()
  .setAuthor("1️⃣")
  .setImage('https://i.imgur.com/fJy93Ou.png') 
  .setColor(0x7700cf);
  
  const embed2= new Discord.RichEmbed()       
  .setAuthor("2️⃣")
  .setImage('https://i.imgur.com/xYqyBjJ.jpg')    
  .setColor(0x7700cf);
  
  const embed3= new Discord.RichEmbed()       
  .setAuthor("3️⃣")
  .setImage('https://i.imgur.com/LBnF3nl.jpg')    
  .setColor(0x7700cf);

  const embed4= new Discord.RichEmbed()       
  .setAuthor("4️⃣")
  .setImage('https://i.imgur.com/lQDUqAr.jpg')    
  .setColor(0x7700cf);

  const embed5= new Discord.RichEmbed()       
  .setAuthor("5️⃣")
  .setImage('https://i.imgur.com/OTQy6tU.jpg')    
  .setColor(0x7700cf);

  const embed6= new Discord.RichEmbed()       
  .setAuthor("6️⃣")
  .setImage('https://i.imgur.com/KGSCgkF.png')    
  .setColor(0x7700cf);




   let confirmation = await message.channel.send({confirm}).then(message => {
    message.channel.send(embed1);
    message.channel.send(embed2);
    message.channel.send(embed3);
    message.channel.send(embed4);
    message.channel.send(embed5);
    message.channel.send(embed6);
});

   const collector = confirmation.channel.createMessageCollector(m => m.content.toLowerCase().startsWith('1') || m.content.toLowerCase().startsWith('2') || m.content.toLowerCase().startsWith('3') || m.content.toLowerCase().startsWith('4') || m.content.toLowerCase().startsWith('5') || m.content.toLowerCase().startsWith('6'),
   {
     time: 30 * 1000,
     maxMatches: 1
   }
 );          
  
  collector.on('collect', async answer => {
    if (answer.content.toLowerCase().startsWith('1')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/1.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/fJy93Ou.png',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
    else if (answer.content.toLowerCase().startsWith('2')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/2.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/xYqyBjJ.jpg',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
    else if (answer.content.toLowerCase().startsWith('3')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/3.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/LBnF3nl.jpg',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
    else if (answer.content.toLowerCase().startsWith('4')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/4.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/lQDUqAr.jpg',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
    else if (answer.content.toLowerCase().startsWith('5')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/5.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/OTQy6tU.jpg',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
    else if (answer.content.toLowerCase().startsWith('6')) {
      message.react('🖼️');
      bot.user.setAvatar('./images/6.png');
      await message.channel.send({
        embed: {
          author: 'Avatar changé!',
          color: '0x7700cf',
          image: 'https://i.imgur.com/KGSCgkF.png',
        }
      });

      bot.log.console('\n');
      bot.log.info('Avatar changé.');
    }
  });
} 
else message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
};