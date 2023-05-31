const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    
    let fontSize = 70;
    
    do {
    
      ctx.font = `${fontSize -=10}px OpenSymbol`;
    } while (ctx.measureText(text).width > canvas.width - 300);
    
    return ctx.font;
    };
    
    
    exports.run = async (bot, message, args) => {
    if (message.mentions.users.size < 1) return message.channel.send("Vous devez mentionner quelqu'un pour lui souhaiter la bienvenue.")
      let member = message.mentions.users.first();
    
      const canvas = Canvas.createCanvas(1920,1080);
      const ctx = canvas.getContext('2d');
    
      const background = await Canvas.loadImage('./assets/images/miku.png');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
      ctx.strokeStyle = "#000";
      ctx.strokeRect(18, 21, 1880, 1040);
    
      ctx.font = '40px OpenSymbol';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Bienvenue sur le serveur,', canvas.width / 2.5, canvas.height / 3.5)
    
      ctx.font = applyText(canvas, `${member.username}`);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${member.username}`, canvas.width / 2.5, canvas.height / 1.8);
    
    
      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      //ctx.clip();
    
      //const {body:buffer} = await snekfetch.get(user.user.displayAvatarURL);
      const avatar = await Canvas.loadImage(member.displayAvatarURL);
      ctx.drawImage(avatar, 810, 340, 200, 200);
    
      const attachment = new Discord.Attachment(
          canvas.toBuffer(),
          "welcome-image.png"
      );
      
      message.channel.send(`Bienvenue sur le serveur, ${member}!`,attachment);
    };