const Discord = require('discord.js');

exports.run = (bot, message, args) => {
let text = args.join(" ");
var rpts = [" Oui ", " Non ", " Parce que ? ", " S'il vous plaît ", " Peut-être ", " Je ne sais pas ", " Certainement? ", " Bien sûr! "," Oui "," Non "," Évidemment "," Absolument pas "];
if (!text) return message.channel.send(`Écrivez une question.`);
message.channel.send(message.member.user+', ma réponse à votre question `'+text+'` est: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');
}