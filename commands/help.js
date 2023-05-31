const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
var maincommands = [
    "**help [numéro]** - B0tsune_M1ku Nightly vous envoie un message privé avec toutes les commandes de la catégories sélectionnés.\n",
    "**ping** - B0tsune_M1ku Nightly répond avec pong et le temps qu'il aura fallu.\n",
    "**embed [texte]** - Envoie un embed contenant [texte].\n",
    "**botinfo** - Affiche toutes les informations sur B0tsune_M1ku Nightly.\n ",
    "**botnick [texte]** - Modifie le pseudo de B0tsune_M1ku Nightly.\n",
    "**botstatus** - Affiche le statut actuel de B0tsune_M1ku Nightly.\n",
    "**reminder [minutes] [texte]** - Vous envoie un rappel contenant [texte] dans [minutes] minute(s).\n ",
    "**invite** - Vous envoie une invitation pour faire venir B0tsune_M1ku Nightly sur votre serveur.\n",
    "**serverinfo** - Affiche les informations sur le serveur actuel.\n",
    "**serveremojis** - Affiche les emojis du serveur.\n",
    "**serverroles** - Affiche les rôles du serveur.\n",
    "**roleinfo [rôle]** - Affiche des informations à propos du rôle précisé.\n",
    "**dm [message]** - B0tsune_M1ku Nightly envoie un message privé à l'utilisateur avec votre [message].\n",
    "**getchannels** - B0tsune_M1ku Nightly va chercher le nombre de channels texte/voix.\n",
    "**membercount** - B0tsune_M1ku Nightly va chercher le nombre de membres/bots.\n",
    "**suggest** - Envoie une suggestion sur le serveur et ajoute des réactions pour voter.\n",
    "**report @Someone** - Rapporte un utilisateur aux modérateurs.\n",
    "**issue [détails]** - Signale un problème avec B0tsune_M1ku Nightly au développeur. Vous pouvez éventuellement proposer des améliorations.\n", 
    "**support** - Vous envoie le lien du serveur de support pour B0tsune_M1ku Nightly.\n ",
    "**uptime** - Obtient le temps de fonctionnement de B0tsune_M1ku Nightly.\n",
    "**whois @Someone** - Obtient les informations sur des utilisateurs.\n",
    "**welcome @Someone** - Souhaite la bienvenue à un utilisateur.\n",
]
var maincommands2 = [ 
    "**changelog** - Affiche les informations à propos de la dernière version de B0tsune_M1ku Nightly.\n",
    "**credits** - Affiche qui a créé le bot et ses contributeurs.\n",
    "**newCMD** - Affiche les nouvelles commandes du mois.\n",
    "**avatar @Someone** - Obtient l'avatar de l'utilisateur.\n",
    "**encode [texte]** - Encode un message dans une autre langue.\n",
    "**decode [texte]** - Décode un message dans une autre langue.\n",
    "**stats** - Affiche les statistiques de B0tsune_M1ku Nightly.\n",
    "**password** - Génère un mot de passe et vous l'envoie par message privé.\n",
]
var moderationcommands = [
    "**ban @Someone [raison]** - Banni l'utilisateur du serveur.\n",
    "**unban @Someone [raison]** - Débanni l'utilisateur du serveur.\n",
    "**softban [ID] [raison]** - Banni puis débanni l'utilisateur du serveur.\n",
    "**hackban [ID] [raison]** - Banni l'ID/utilisateur du serveur.\n",
    "**unhackban [ID] [raison]** - Débanni l'ID/utilisateur du serveur.\n",
    "**mute @Someone [minutes] [raison]** - Retire le droit de parole de l'utilisateur du serveur pour le temps donné. [Le rôle `Muted` doit exister et les permissions des channels doivent être configurées.]\n",
    "**unmute @Someone [raison]** - Rétabli le droit de parole de l'utilisateur du serveur.\n",
    "**purge [montant]/@Someone [raison/montant]** - Purge les messages du serveur/utilisateur.\n ",
    "**clean [montant]** - Supprime les messages de B0tsune_M1ku Nightly.\n",
    "**clear <montant> <@Someone>** - Efface tout les messages, le montant donné, ou les messages de l'utilisateur si mentionné.\n",
    "**antiraid [minutes] [raison]** - Désactive le rôle par défaut pour envoyer des messages.\n",
    "**giverole @Someone [nom du rôle]** - Donne à l'utilisateur le rôle que vous avez spécifié.\n",
    "**takerole @Someone [nom du rôle]** - Supprime le rôle que vous avez spécifié à l'utilisateur.\n",
    "**roleall [nom du rôle]** - Donne à tous les utilisateurs le rôle que vous avez spécifié.\n",
    "**alert** - Envoie une alerte à tous les membres du serveur. Identique à @everyone, mais par messages privés.\n",
]
var moderationcommands2 = [
    "**rroleall [nom du rôle]** - Prend à tous les utilisateurs le rôle que vous avez spécifié.\n",
    "**slowmode [secondes]** - Permet aux utilisateurs d'envoyer un message toutes les x secondes.\n",
    "**logs [1/2/3]** - Donne des options pour modifier les paramètres des logs.\n",
    "**modonly** - Les commandes ne fonctionneront que pour les mods (Les mods/mods+ ont besoin au minimum de la permission KICK_MEMBERS pour fonctionner).\n",
    "**createrole [nom du rôle] [couleur du rôle]** - Créé un rôle avec la couleur et le nom que vous voulez.\n ",
    "**welcomeleave** - Vous donne toutes les options pour contrôler le système d'accueil/départ.\n",
    "**poll [texte]** - Commence un sondage pour que vos membres votent aussi.\n",
    "**nick [texte]** - Change le pseudo de l'utilisateur.\n",
    "**warn - @Someone [raison]** - Avertit l'utilisateur avec [raison].\n",
    "**warnings @Someone** - Affiche les avertissements de l'utilisateur actuel.\n",
    "**clearwarns @Someone** - Supprime tous les avertissements actuels que l'utilisateur possède.\n",
    "**settings** - Affiche les paramètres actuels du serveur.\n",
    "**announce [texte]** - Annonce un message.\n",
] 
var funcommands = [
    "**slap @Someone** - Envoie une image de vous giflant cet utilisateur.\n",
    "**shit @Someone** - Envoie une image de vous piétinant sur cet utilisateur.\n",
    "**buttslap @Someone** - Envoie une image de vous frappant les fesses de cet utilisateur. [NSFW]\n",
    "**rip @Someone** - Envoie une image respectueuse à cet utilisateur.\n",
    "**trigger @Someone** - Envoie une image de cet utilisateur étant triggered.\n",
    "**bill @Someone** - Envoie une image de cet utilisateur sur un billet.\n",
    "**brazzers @Someone** - Envoie une image avec le logo brazzers sur cet utilisateur.\n",
    "**beautiful @Someone** - Envoie une image de cet utilisateur dans un cadre photo.\n",
    "**crush @Someone** - Envoie une image de vous ayant le béguin pour cet utilisateur.\n",
    "**delete @Someone** - Envoie une image supprimant cet utilisateur.\n",
    "**jail @Someone** - Met l'utilisateur derrière les barreaux.\n",
    "**thuglife @Someone** - Met thuglife sur l'avatar de l'utilisateur.\n",
    "**rainbow @Someone** - Met un arc-en-ciel sur l'avatar de l'utilisateur.\n",
    "**approved @Someone** - Met la mention approuvé sur l'avatar de l'utilisateur.\n",
    "**rejected @Someone** - Met la mention rejeté sur l'avatar de l'utilisateur.\n",
    "**wasted @Someone** - Met wasted sur l'avatar de l'utilisateur.\n",
    "**power @Someone** - Met l'avatar de l'utilisateur sur un personnage puissant.\n",
    "**tattoo @Someone** - Met l'avatar de l'utilisateur sous forme de tatouage.\n",
    "**8ball [question]** - B0tsune_M1ku Nightly répond avec une réponse au hasard provenant du 8balles.\n",
    "**coinflip** - B0tsune_M1ku Nightly répond avec pile ou face.\n",
    "**cat** - B0tsune_M1ku Nightly envoie une photo de chat au hasard.\n",
    "**dog** - B0tsune_M1ku Nightly envoie une photo de chien au hasard.\n",
    "**roll [nombre maximum]** - B0tsune_M1ku Nightly lance les dés entre 1 et le nombre maximum`.\n",
    "**achievement [texte]** - Vous envoie un succès Minecraft.\n",
]
var funcommands2 = [
    "**reverse [texte]** - Inverse le texte que vous avez fourni.\n",
    "**roblox [utilisateur]** - Cherche un utilisateur sur Roblox.\n",
    "**rr** - Jouez à la roulette russe.\n",
    "**say [texte]** - B0tsune_M1ku Nightly dis [texte].\n",
    "**sexyrate** - B0tsune_M1ku Nightly évalue votre sexytude de 1 à 100.\n",
    "**ship [texte/@Someone] [texte/@Someone]** - Ship un objet/utilisateur avec un autre objet/utilisateur.\n",
    "**slots** - Jouez avec une machine à sous.\n",
    "**textflip [texte]** - Retourne le texte à l'envers.\n",
    "**urban [mot]** - Obtient la définition d'un mot.\n [Anglais]",
    "**weeb** - Envoie une image d'anime au hasard.\n",
    "**wiki [recherche]** - Cherche le sujet sur Wikipedia pour [recherche].\n",
    "**wur** - Jouez à un jeu de Would you Rather.\n [Anglais]",
    "**youtube [recherche]** - Fait une recherche de vidéo YouTube pour [recherche].\n",
    "**fish** - Aller pêcher.\n",
    "**choose [choix1] [choix2]** - B0tsune_M1ku Nightly choisi entre 2 options que vous avez fournis.\n",
    "**reddit [subreddit]** - B0tsune_M1ku Nightly envoie un post tendance au hasard provenant du [subreddit] donné.\n",
    "**meme** - B0tsune_M1ku Nightly envoie un meme tendance au hasard provenant de r/dankmemes.\n",
    "**jojoke** - B0tsune_M1ku Nightly envoie un JoJoke tendance au hasard provenant de r/ShitpostCrusaders.\n",
    "**showerthoughts** - B0tsune_M1ku Nightly envoie un post au hasard provenant de r/showerthoughts",
    "**advice** - B0tsune_M1ku Nightly envoie des conseils au hasard. [Anglais]\n",
    "**compliment** - B0tsune_M1ku Nightly complimente l'utilisateur que vous avez mentionnez.\n",
    "**roast** - B0tsune_M1ku Nightly clash l'utilisateur que vous avez mentionné.\n",
    "**percentage [number1] [number2]** - B0tsune_M1ku Nightly vous donne le pourcentage entre 2 nombres.\n",
]
var funcommands3 = [
    "**miku** - Envoie une image de Hatsune Miku ❤.\n",
    "**02** - Envoie une image de Zero Two (Darling in the Franxx).\n",
    "**alk [freestyle/plushaut]** - Envoie un embed de Alkpote sur la chanson concernée.\n",
    "**lenny** - Envoie un Lenny.\n",
    "**math [calcul]** - B0tsune_M1ku Nightly résoudra [calcul], mais nous savons tous que 2+2=5.\n",
    "**lottery** - Jouez à la lotterie.\n",
    "**pfc** - Jouez à pierre, feuille, ciseaux avec B0tsune_M1ku Nightly.\n",
    "**muk** - Envoie une image The More You Know.\n",
    "**lmgtfy [texte]** - Envoie un lien LMGTFY-ié de [texte].\n",
    "**motivate** - B0tsune_M1ku Nightly vous envoie de la motivation.\n",
    "**animtableflip** - B0tsune_M1ku Nightly retourne une table.\n",
    "**tableflip** - B0tsune_M1ku Nightly retourne (toujours) une table.\n",
    "**unflip** - B0tsune_M1ku Nightly repose une table.\n",
    "**test** - Effectue un test. Que demander de plus ?\n",
    "**dab** - B0tsune_M1ku Nightly fait un dab.\n",
    "**edgelord** - Envoie un texte d'un EdgeLord.\n",
    "**crash** - Vous n'oseriez quand même pas ?\n",
    "**killme** - Vous fait réapparaître.\n",
    "**lorenzo** - Envoie une punchline du rappeur Lorenzo.\n",
    "**sah** - Quel plaisir.\n",
    "**yt** [recherche / lien] - Recherche une vidéo sur YouTube.\n",
]
var funcommands4 = [
    "**ratewaifu** [waifu] - Note votre waifu.\n",
    "**trueorfalse [question]** - Propose un vrai ou faux sur le salon.\n",
    "**rfc** - Envoie les règles du Fight Club.\n",
    "**fakeBan** - Fait semblant de bannir quelqu'un.\n",
    "**fwarn** - Fait semblant de warn quelqu'un.\n",

]
var roleplaycommands = [
    "**kiss @Someone** - Envoie une image embrassant cet utilisateur.\n",
    "**marry @Someone** - Envoie une image épousant cet utilisateur.\n",
    "**high-five @Someone** - Envoie une image high-fivant cet utilisateur.\n",
    "**cuddle @Someone** - Envoie une image câlinant cet utilisateur.\n",
    "**fist-bump @Someone** - Envoie une image frappant au poing cet utilisateur.\n",
    "**poke @Someone** - Envoie une image pokant cet utilisateur.\n",
    "**pat @Someone** - Envoie une image caressant cet utilisateur.\n",
    "**punch @Someone** - Envoie une image frappant cet utilisateur.\n",
    "**hold-hands @Someone** - Envoie une image tenant la main de cet utilisateur.\n",
    "**tackle @Someone** - Envoie une image taclant cet utilisateur.\n",
    "**drop-kick @Someone** - Envoie une image donnant un coup de pied à cet utilisateur.\n",
    "**octogone @Someone** - Propose un octogone sans règle à cet utilisateur.\n",
]
var nsfwcommands = [
    "**r34 [recherche]** - Envoie une image hentai basée sur [recherche]. [Les espaces doivent être remplacés par des underscores]\n", 
    "**hentai** - Envoie une image hentai.\n",
    "**cosplay** - Envoie une image de cosplay.\n",
    "**uniform** - Envoie une image en uniforme.\n",
    "**ass** - Envoie une image de cul.\n",
    "**boobs** - Envoie une image de seins.\n",
    "**snapchat** - Envoie un snap NSFW.\n",
    "**anal** - Envoie une image d'anal.\n",
    "**public** - Envoie une image de baise publique.\n",
    "**asian** - Envoie une image d'asiatique.\n",
    "**funnyNSFW** - Envoie une photo NSFW au hasard qui peut être drôle.\n",
    "**4k** - Envoie une photo NSFW 4K.\n",
    "**amateur** - Envoie une photo amateur.\n",
    "**feets** - Envoie une image de pieds.\n",
    "**milf** - Envoie une image de MILF.\n",
    "**pussy** - Envoie une image de chatte.\n",
    "**thigh** - Envoie une image de cuisses.\n",
]
var levelcommands = [
    "**profile @Someone** - Obtient le profil de quelqu'un.\n",
    "**deposit [montant]** - Dépose [montant] dans votre banque.\n",
    "**withdraw [montant]** - Retire [montant] de votre banque.\n [Taxe de 5%]",
    "**transfer @Someone [montant]** - Vous permet de transférer de l'argent à un autre utilisateur.\n",
    "**leaderboard [cash/level]** - Affiche le top 10 du serveur.\n",
    "**awards** - Affiche les récompenses de B0tsune_M1ku Nightly.\n",
    "**rob @Someone** - Essayez de voler cet utilisateur pour un maximum de 5 000 mais ne vous faîtes pas attraper.\n",
    "**work** - Travaillez pour la journée et gagnez de l'argent. [recharge: 10 mins]\n",
    "**hack** - C'est comme travailler mais vous pouvez gagner plus d'argent, mais vous pouvez aussi avoir une amende. [recharge 15 mins]\n",
    "**rep @Someone** - Donne un point de réputation à un utilisateur. [recharge 1 heure]\n",
    "\n",
    "**Ces commandes requièrent la permission MANAGE_GUILD**",
    "**givemoney @Someone [montant]** - Vous permet de donner de l'argent à un utilisateur.\n",
    "**takemoney @Someone [montant]** - Vous permet de prendre de l'argent à un utilisateur.\n",
    "**givexp @Someone [montant]** - Vous permet de donner de l'XP à un utilisateur.\n",
    "**takexp @Someone [montant]** - Vous permet de prendre de l'XP à un utilisateur.\n",
    "**profilesystem** - Vous permet d'activer/désactiver le système de niveaux/argent sur votre serveur.\n",
]
var ownercommands = [
    "**reload [commande]** - Recharge la [commande] précisée de B0tsune_M1ku Nightly.\n",
    "**setgame [texte]** - Défini une activité pour B0tsune_M1ku Nightly.\n",
    "**setstatus [statut]** - Défini un statut pour B0tsune_M1ku Nightly.\n",
    "**eval [code]** - Réalise une commande sur le serveur.\n",
    "**exec [code]** - Exécute une commande appartenant à B0tsune_M1ku Nightly.\n",
    "**setavatar [numéro]** - Change la photo de profil de B0tsune_M1ku Nightly.\n",
    "**botname [texte]** - Change le nom d'utilisateur de B0tsune_M1ku Nightly.\n",
    "**setavatarLink [lien]** - Change l'avatar avec un lien d'image.\n",
]

exports.run = (client, message, args) => { 
    
    const prefixtouse = "n."
    const embed10 = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setThumbnail(`https://i.imgur.com/1RcLKlI.gif?size=2048`)
    .setTitle("Veuillez sélectionner une catégorie.")
    .addField("Options", "1️⃣ - Commandes Principales \n2️⃣ - Commandes de Modération \n3️⃣ - Commandes Fun \n4️⃣ - Commandes Roleplay \n5️⃣ - Commandes NSFW \n6️⃣ - Commandes de Niveaux \n7️⃣ - Commandes du Développeur")
    message.channel.send(embed10);

    message.channel.awaitMessages(m => m.author.id == message.author.id, 
        { max: 1, time: 60000, errors: ['time'] })

    .then(collected => {
        const reaction = collected.first();
        if (collected.first().content.toLowerCase() === '1') {
            const embed = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes Principales")
            .setDescription(maincommands)
            .setFooter("Page 1")

            const embedb = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setDescription(maincommands2)
            .setFooter("Page 2")
            message.author.send(embed).then(msg => {
            message.author.send(embedb);
            })
            message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:").catch(() => message.channel.send("Une erreur est survenue lors de l'envoi des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '2') {
            const embed2 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes de Modération")
            .setDescription(moderationcommands)
            .setFooter("Page 1")

            const embed2b = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setDescription(moderationcommands2)
            .setFooter("Page 2")
            message.author.send(embed2).then(msg => {
            message.author.send(embed2b);
            })
            message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:").catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '3') {
            const embed3 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes Fun")
            .setDescription(funcommands)
            .setFooter("Page 1")

            const embed3b = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setDescription(funcommands2)
            .setFooter("Page 2")

            const embed3c = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setDescription(funcommands3)
            .setFooter("Page 3")

            const embed3d = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setDescription(funcommands4)
            .setFooter("Page 3")
            message.author.send(embed3).then(msg => {
            message.author.send(embed3b)
            message.author.send(embed3c)
            message.author.send(embed3d);
            })
            message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:").catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '4') {
            const embed4 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes Roleplay")
            .setDescription(roleplaycommands)
            message.author.send(embed4).then(() => message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:")).catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '5') {
            const embed5 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes NSFW")
            .setDescription(nsfwcommands)
            message.author.send(embed5).then(() => message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:")).catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '6') {
            const embed6 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes de Niveaux")
            .setDescription(levelcommands)
            message.author.send(embed6).then(() => message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:")).catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))

        } else if (collected.first().content.toLowerCase() === '7') {
            const embed7 = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setTitle("Commandes du Développeur")
            .setDescription(ownercommands)
            message.author.send(embed7).then(() => message.channel.send("Les commandes vous ont été envoyées par message privé. :incoming_envelope:")).catch(() => message.channel.send("Une erreur est survenue lors de l'envoie des commandes par message privé. Assurez-vous que vous avez activé les messages provenant des membres du serveur."))
            
        } else {
            message.channel.send("Vous n'avez pas sélectionné une option valide. Veuillez recommencer la manipulation.")
        }
            })
            .catch(() => {
                message.reply('vous n\'avez pas répondu après 60 secondes, arrêt de la commande.');
        });
}
   
