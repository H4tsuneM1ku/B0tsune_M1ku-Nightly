const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription("❌ Vous ne disposez pas les permissions nécessaires pour effectuer cette commande.")
            .setColor("#F43436")
        message.channel.send(error_permissions)
    }
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let arg = message.content.split(" ").slice(1);
        let thingToEcho = arg.join(" ")
        if (!args[0]) return message.channel.send("❌ Votre syntaxe est incorrecte. \n```Syntaxe : n.trueorfalse <Message>```")
        var trueorfalse = new Discord.RichEmbed()
            .setTitle("❓ VRAI OU FAUX :")
            .addField(thingToEcho, "Répondez avec les réactions ✅ ou ❌!")
            .setColor("#A31F33")
        message.channel.send(trueorfalse)
        .then(function (message){
            message.react("✅")
            message.react("❌")
        }).catch(function(){

        });
        message.delete()
    }
}

module.exports.help = {
    name: "trueorfalse"
}