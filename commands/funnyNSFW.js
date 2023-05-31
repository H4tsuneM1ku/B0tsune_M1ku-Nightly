const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
const { promisifyAll } = require('tsubaki');
const xml = promisifyAll(require('xml2js'));
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":underage: Vous avez besoin d'être dans un channel NSFW pour utiliser cette commande.")
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/NSFWfunny.json?sort=top&t=week')
            .query({ limit: 800 });
    const allowed = !message.channel.nsfw ? body.data.children : body.data.children.filter(post => post.data.over_18);
    if (!allowed.length) return message.channel.send('Il semblerait que nous soyons à court d’images fraîches pour vous! Essayez à nouveau plus tard.');
    const randomnumber = Math.floor(Math.random() * allowed.length)
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setTitle(allowed[randomnumber].data.title)
        .setImage(allowed[randomnumber].data.url)
        .setFooter("FunnyNSFW • Powered by Reddit")
    message.channel.send(embed)
  }
   
