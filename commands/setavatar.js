const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (client, message, args) => {
  if (message.author.id == "258394351628058636") {
   let choice = args.join(' ').toLowerCase();
      const choices = ['1', '2', choice, '1', '2'];
        if (!choice) {
          let embed1= new Discord.RichEmbed()
          .setAuthor("1️⃣")
          .setImage('https://i.imgur.com/fJy93Ou.png') 
          .setColor(0x7700cf);
          
          let embed2= new Discord.RichEmbed()       
          .setAuthor("2️⃣")
          .setImage('https://i.imgur.com/xYqyBjJ.jpg')    
          .setColor(0x7700cf);
          
          let embed3= new Discord.RichEmbed()       
          .setAuthor("3️⃣")
          .setImage('https://i.imgur.com/LBnF3nl.jpg')    
          .setColor(0x7700cf);
        
          let embed4= new Discord.RichEmbed()       
          .setAuthor("4️⃣")
          .setImage('https://i.imgur.com/lQDUqAr.jpg')    
          .setColor(0x7700cf);
        
          let embed5= new Discord.RichEmbed()       
          .setAuthor("5️⃣")
          .setImage('https://i.imgur.com/OTQy6tU.jpg')    
          .setColor(0x7700cf);
        
          let embed6= new Discord.RichEmbed()       
          .setAuthor("6️⃣")
          .setImage('https://i.imgur.com/KGSCgkF.png')    
          .setColor(0x7700cf);      
          
          return message.channel.send("Vous devez choisir entre les images 1️⃣, 2️⃣, 3️⃣, 4️⃣, 5️⃣ et 6️⃣.").then(message => {
                 message.channel.send(embed1);
                 message.channel.send(embed2);
                 message.channel.send(embed3);
                 message.channel.send(embed4);
                 message.channel.send(embed5);
                 message.channel.send(embed6);
            });
        }          
      
          else if (choice === '1') {
            message.react('🖼️')
              client.user.setAvatar('./images/1.png')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/fJy93Ou.png`)
                .setFooter(client.user.username, AvaBot)
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
                .setFooter(client.user.username, AvaBot)
                .setTimestamp()
           return message.channel.send(embed)
        
        }  else if (choice === '3') {
            message.react('🖼️')
              client.user.setAvatar('./images/3.jpg')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/LBnF3nl.jpg`)
                .setFooter(client.user.username, AvaBot)
                .setTimestamp()
           return message.channel.send(embed)
        
        }  else if (choice === '4') {
            message.react('🖼️')
              client.user.setAvatar('./images/4.jpg')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/lQDUqAr.jpg`)
                .setFooter(client.user.username, AvaBot)
                .setTimestamp()
           return message.channel.send(embed)
        
        }  else if (choice === '5') {
            message.react('🖼️')
              client.user.setAvatar('./images/5.jpg')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/OTQy6tU.jpg`)
                .setFooter(client.user.username, AvaBot)
                .setTimestamp()
           return message.channel.send(embed)
        
          }  else if (choice === '6') {
            message.react('🖼️')
              client.user.setAvatar('./images/6.png')
              let AvaBot = client.user.displayAvatarURL
              const embed = new Discord.RichEmbed()
                .setAuthor("Avatar changé!")
                .setColor(0x7700cf)
                .setImage(`https://i.imgur.com/KGSCgkF.png`)
                .setFooter(client.user.username, AvaBot)
                .setTimestamp()
           return message.channel.send(embed)
        }
    } else message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
};