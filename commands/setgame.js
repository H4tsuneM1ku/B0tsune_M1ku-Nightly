const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
   if (message.author.id == "258394351628058636") {
    var gametoset = args.join(' ');
    if (!gametoset) gametoset = null;
    client.user.setGame(gametoset);
    message.reply("Le nouveau jeu a été défini!");
    } else {
   message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
    }
}
