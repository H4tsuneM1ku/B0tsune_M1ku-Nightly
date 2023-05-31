const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    var roulette = [':gun: Pan! Vous êtes mort, essayer encore?',':gun: Heureusement pour vous, **vous avez survécu** ! Voulez-vous tester votre chance à nouveau ?',':gun: Oh zut, ça n\'a pas tiré! Ou est-ce une bonne chose? (Essayez encore)'];
    message.channel.send(roulette[Math.floor(Math.random () * roulette.length)]);
  }
   
