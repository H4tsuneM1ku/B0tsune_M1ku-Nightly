const Discord = require("discord.js");
const bot = new Discord.Client();

exports.run = (client, message, args) => {

  const embed10 = new Discord.RichEmbed()
  .setColor(0x7700cf)
  .setImage(`https://i.imgur.com/QqwUYRS.gif`)
  .setTitle("Veuillez sélectionner une chanson.")
  .addField("Options", "1️⃣ - Tounsi Freestyle Pt.2 \n2️⃣ - Plus haut")
  message.channel.send(embed10);

  message.channel.awaitMessages(m => m.author.id == message.author.id, 
    { max: 1, time: 15000, errors: ['time'] })

.then(collected => {
  const reaction = collected.first();

  if (collected.first().content.toLowerCase() === '1') {
            let embed= new Discord.RichEmbed()
              .setAuthor('PU-PU-PU-PUTE')
              .setDescription(`Sucez moi tant que je respire encore\nVous me sucerez même quand je serai mort\nSuce-moi dès le réveil ou bien quand je m'endors\nJ'ai mal à la bite, ils m'ont sucé tellement fort\nhttps://www.youtube.com/watch?v=rOIhstNTmP4`)
              .setImage('https://i.imgur.com/3CQvwKS.gif')
              .setColor(0x7700cf)
            return message.channel.send(embed);

        } else if (collected.first().content.toLowerCase() === '2') {
            let embed= new Discord.RichEmbed()
              .setAuthor('SALOPE SALOPE')
              .setDescription(`J'me suis évadé d'l'école et j'ai vendu ma came, viens vider mes couilles, j'éjacule du Vademecum\nJ'ai roulé des cônes et j'ai pas aimé l'com', cette année, j'dégomme\nOn a des médocs, j'suis comme un vrai doc, je t’ausculte, enlève tes vêtements\nhttps://www.youtube.com/watch?v=T_X-BbsXXAk`)
              .setImage('https://i.imgur.com/dh8RRo8.gif')
              .setColor(0x7700cf)
            return message.channel.send(embed);

  } else {
    message.channel.send("Vous n'avez pas sélectionné une option valide. Veuillez recommencer la manipulation.")
}
})
.catch(() => {
    message.reply('vous n\'avez pas répondu après 15 secondes, arrêt de la commande.');
});
}