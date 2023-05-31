const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
	try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/Showerthoughts.json')
            .query({ limit: 1000 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Il semble que les pensées de douche sont finies dès maintenant. Essayez à nouveau plus tard!');
        return message.channel.send(allowed[Math.floor(Math.random() * allowed.length)].data.title);
    } catch (err) {
        return;
    }
}
   
