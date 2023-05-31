const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const lottery = Math.floor(Math.random() * 100) + 1;
    if (lottery === 1) return message.reply(`Wow! Vous avez gagné! Beau travail!`);
    message.reply(`Nope, désolé, vous avez perdu.`);
}
