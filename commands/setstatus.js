const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
     if (message.author.id == "258394351628058636") {
            var argresult = args.join(' ');
            client.user.setStatus(argresult);
            message.reply("Le nouveau statut a été défini!");
        } else {
            message.reply(" Vous n'avez pas les permissions. Développeur du bot uniquement. :x:");
        }
}
   
