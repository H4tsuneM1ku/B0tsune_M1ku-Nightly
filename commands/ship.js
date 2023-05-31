const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
        let user1 = args[0];
        let user2 = args.slice(1).join(' ');
        if (!user1) return message.channel.send("Vous n'avez pas mentionné le premier utilisateur à ship.")
        if (!user2) return message.channel.send("Vous n'avez pas mentionné le second utilisateur à ship.")
        var ship = Math.floor(Math.random() * 100) + 1;
        if (ship <= 50) {
                    const badmatch = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle(user1 + " et " + user2 + " ne se correspondent pas beaucoup.")
                    .setImage('http://neantvert.eu/wp-content/uploads/2018/08/tumblr_mvtzak4O091svfte7o1_500.gif')
                    .setDescription(":broken_heart: " + ship + "% :broken_heart:");
                    message.channel.send(badmatch);
           } else if (ship === 100) {
                const perfectmatch = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle(user1 + " et " + user2 + " sont destinés l'un pour l'autre.")
                    .setImage('https://thumbs.gfycat.com/BlankSecondhandInganue-size_restricted.gif')
                    .setDescription(":revolving_hearts: " + ship + "% :revolving_hearts:");
                    message.channel.send(perfectmatch);
           } else {
               const match = new Discord.RichEmbed()
                    .setColor(0x7700cf)
                    .setTitle(user1 + " et " + user2 + " se correspondent très bien!")
                    .setImage('https://tenor.com/05fP.gif')
                    .setDescription(":sparkling_heart: " + ship + "% :sparkling_heart:");
                    message.channel.send(match);
            }
}