const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
        const subreddit = args.join(" ") || 'random'
        const subRedCat = args.slice(1).join(" ") || 'random'
        const { body } = await snekfetch
            .get(`https://www.reddit.com/r/${subreddit}/${subRedCat}.json`)
       
        let meme;
        if (body[0]) {
          meme = body[0].data.children[Math.floor(Math.random() * body[0].data.children.length)].data;
        } else {
          meme = body.data.children[Math.floor(Math.random() * body.data.children.length)].data;
        }
        const embed = new Discord.RichEmbed()
        .setAuthor(meme.title)
        .setDescription(`Ratio de Upvote: ${meme.upvote_ratio}`)
        .setImage(meme.url)
        .setFooter(`Soumis par u/${meme.author} dans ${meme.subreddit_name_prefixed}`)
        .setURL(meme.url)
        .setColor(0x7700cf);
        await message.channel.send(embed);
  }
   
