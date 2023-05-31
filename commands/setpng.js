const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (client, message, args) => {
  if (message.author.id == "258394351628058636") {
   let choice = args.join(' ').toLowerCase();
      const choices = ['1', '2', choice, '1', '2'];
        if (!choice) {
          let embed1= new Discord.RichEmbed()
          .setAuthor("[1]")
          .setImage('https://i.imgur.com/fJy93Ou.png') 
          .setColor(0x7700cf);
          
          let embed2= new Discord.RichEmbed()       
          .setAuthor("[2]")
          .setImage('https://i.imgur.com/xYqyBjJ.jpg')    
          .setColor(0x7700cf);         
          
          return message.channel.send("Vous devez choisir entre les images **[1]** et **[2]**.").then(message => {
                 message.channel.send(embed1).then(message => {
                 message.channel.send(embed2);
            })
          });            
      
        }  else if (choice === '1') {
            message.react('🖼️')
              client.user.setAvatar('./images/1.png')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/fJy93Ou.png`)
                .setFooter(client.user.username, `https://i.imgur.com/fJy93Ou.png`)
                .setTimestamp()
           return message.channel.send(embed)
       
        }  else if (choice === '2') {
            message.react('🖼️')
              client.user.setAvatar('./images/2.png')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/xYqyBjJ.jpg`)
                .setFooter(client.user.username, `https://i.imgur.com/xYqyBjJ.jpg`)
                .setTimestamp()
           return message.channel.send(embed)
        }
    } else message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
};