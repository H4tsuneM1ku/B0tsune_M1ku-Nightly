const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  const choice1 = args[0]
  const choice2 = args.slice(1).join(" ")
  if (choice2 < 1) return message.channel.send("Il n'y a pas de second choix.")
  var choices = [`${choice1}`, `${choice2}`]
  message.channel.send(`Je choisis ${choices[Math.floor(Math.random() * choices.length)]}!`);
}