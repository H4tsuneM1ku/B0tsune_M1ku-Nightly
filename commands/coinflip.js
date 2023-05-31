const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      var coinflip = ['Face!','Pile!'];
      message.channel.send(coinflip[Math.floor(Math.random () * coinflip.length)]);
}
   
