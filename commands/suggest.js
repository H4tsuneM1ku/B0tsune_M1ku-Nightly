const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    let thingToEcho = arg.join(" ");
    if(!args[0]) return message.channel.send(":x: Votre syntaxe est incorrecte. \n```Syntaxe : n.suggest <Description>```")
    var suggest = new Discord.RichEmbed()
        .setDescription("📮 | Nouvelle suggestion !")
        .addField("💼 __Auteur :__", "<@" + message.author.id + ">")
        .addField("📝 __Description :__", thingToEcho, true)
        .setColor("#FFD97C")
    message.channel.send(suggest)
    .then(function (message){
        message.react("✅")
        message.react("❎")
    }).catch(function(){

    });
    message.delete();
    message.author.send("✅ Votre suggestion viens d'être envoyé sur le salon.")
}

module.exports.help = {
    name: "suggest"
}