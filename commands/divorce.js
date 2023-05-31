const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("Vous ne pouvez pas divorcer de personne.")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} a divorcé avec ${message.author.username} :broken_heart:`,{
                embed: {
                    image: {
                        url: "https://i.imgur.com/IgvLWaa.gif"
                    }
                }
            })
}
   
