const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    try {
       const text = args.join(" ");
        if (!text) return message.channel.send("Vous devez écrire quelque chose pour l'achèvement.");
            if (text.length > 25) return message.reply('Le texte doit faire moins de 25 caractères.');
        const superagent = require('superagent')
        message.channel.startTyping();
        const { body } = await superagent
            .get('https://www.minecraftskinstealer.com/achievement/a.php')
            .query({
                i: 1,
                h: 'Achievement Get!',
                t: text
            });
        message.channel.send({ files: [{ attachment: body, name: 'achievement.png' }] 
      });
        message.channel.stopTyping();
    } catch (err) {
            console.log(err)
    }
}