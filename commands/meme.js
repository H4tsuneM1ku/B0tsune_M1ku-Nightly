const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
	try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Il semblerait que nous soyons à court de memes frais pour vous! Essayez à nouveau plus tard.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posté par: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Autres infos:", "Up votes: " + allowed[randomnumber].data.ups + " / Commentaires: " + allowed[randomnumber].data.num_comments)
        .setFooter("Meme fourni par r/dankmemes")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
}
   
