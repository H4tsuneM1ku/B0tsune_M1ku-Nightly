const Discord = require("discord.js");
exports.run = (client, message, args) => {
      const embed = new Discord.RichEmbed()
      //.setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x7700cf)
      .setTitle("Nouvelles commandes du bot")
      .addField("**Août 2019**", "• **dab** - B0tsune_M1ku Nightly fait un dab.\n• **edgelord** - Envoie un texte d'un EdgeLord.\n• **crash** - Vous n'oseriez quand même pas ?\n• **miku** - Envoie une image de Hatsune Miku ❤.\n• **02** - Envoie une image de Zero Two (Darling in the Franxx).\n• **killme** - Vous fait réapparaître.\n•**alert** - Envoie une alerte à tous les membres du serveur.\n")
      .addField("**Octobre 2019**", "• **octogone @Someone** - Propose un octogone sans règle à cet utilisateur.\n• **lorenzo** - Envoie une punchline aléatoire du rappeur Lorenzo.\n• **sah** - Quel plaisir.\n• **yt [recherche / lien]** - Recherche une vidéo sur YouTube.\n")
      .addField("**Novembre 2019**", "• **setavatarlink** - Change l'avatar avec un lien d'image.\n• **encode [texte]** - Encode un message dans une autre langue.\n• **decode [texte]** - Décode un message dans une autre langue.\n• **ratewaifu [waifu]** - Note votre waifu.\n• **announce [texte]** - Annonce un message.\n• **stats** - Affiche les statistiques de B0tsune_M1ku Nightly.\n• **password** - Génère un mot de passe et vous l'envoie par message privé.\n• **trueorfalse [question]** - Propose un vrai ou faux sur le salon.\n")
      .addField("**Décembre 2019**", "• **rfc** - Envoie les règles du Fight Club.\n• **fban** - Fait semblant de bannir quelqu'un.\n• **fwarn** - Fait semblant de warn quelqu'un.\n• **welcome @Someone** - Souhaite la bienvenue à un utilisateur.\n")
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
 }