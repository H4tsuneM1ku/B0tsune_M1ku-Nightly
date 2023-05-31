const Discord = require('discord.js');

exports.run = (bot, message, args) => {

    message.reply('Est ce que tu es une pute ?\n'
                    + 'Confirme avec "👍" ou refuse avec "👎"');

message.react('👍').then(r => {
message.react('👎');
});

message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
{ max: 1, time: 15000 }).then(collected => {
if (collected.first().emoji.name == '👍') {
  
  var embed = new Discord.RichEmbed()
    .setAuthor(`Tu es une belle grosse pute ${message.author.username}#${message.author.discriminator}`)
    .setImage(`${message.author.avatarURL}?size=2048`)
    .setColor(0x7700cf);
  message.channel.send({ embed });

} else
    message.channel.send(`C'est bien, t'es respectable`);

})
.catch(() => {
    message.channel.send("T'as même pas osé répondre, grosse merde.");
});


}