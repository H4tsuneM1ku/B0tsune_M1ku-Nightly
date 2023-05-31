const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
exports.run = async (client, message, args) => {
    var mam = [
    "Y a pas de cours de magie donc j'vais pas à la fac, ma bite Wingardium devant Emma Watson",
    "J'suis autant respecté qu'une bonne meuf dans ma cité",
    "Si j'connais ta meuf, ça veut dire qu't'es cocu",
    "T'es l'enfant du péché tout en étant le fils d'un Dieu",
    "J'ai niqué la sœur de la mère de ta cousine, J'AI NIQUÉ LA SŒUR DE LA MÈRE DE TA COUSINE",
    "J'voulais-voulais qu'tu sois la femme de ma life j'avais la diarrhée car l'amour rend malade",
    "Des samoussas au salami bi-bi et mourir c'est ça la vie",
    "Pourquoi t'étais Charlie mais t'étais pas Jean-Pierre Coffe",
    "Briquet devant mon cul j'crache le feu comme un dragon, on a pimpé ta meuf sous ses fesses il y a des néons",
    "Mamène tu m'dois du fric, crois pas que j'vais passer à coté j'tiens une bonne trique, j'sais pas si tu pourras remarcher",
    "Dans le Hit Machine j'viens rajouter un tube, on zappe tous tes sons comme si c'était la pub",
    "J'déteste juste les keufs, j'aime bien les obèses et les pédés",
    "Avale avale c'est riche en oméga 3, cavale cavale sur mon cheval de Troie",
    "Sur le périph' en booster, ça s'amuse, à semer la B.A.C, une vodka Cacolac avec une Bernadette comme Jacques Chirac, j'baise aussi les moches ouais, ouais, j'fais preuve de charité",
    "J'suis déshydraté mamène j'éjacule en poudre",
    "J'paye le resto quant il parle de famine (boloss), j'ai un compte plein, j'veux les couilles vides (hein)",
    "J'vais plus en boite, me parfume plus au Axe, t'étais ma Cendrillon, j't'enfilais tes Air Max",
    "J'crois au Père Noël, pas au respect, bendo protégé par l'ONU, à part faire du sale j'ai pas d'plan B",
    "Pour partir au soleil, on vendait du chichon y'a notre sextape en kayak dans le Zap de Spi0n",
    "Sur l'canap ça coule des douilles, y'a du canna sous les couilles, j'prends du plaisir pendant la fouille",
    "L'amour est mort, j'me branlerais peut-être sur ta dernière nude , le respect a jamais dans le triangle des Bermudes",
    "T'as tiré deux tafs et t'es déjà kaput, j'suis l'coq de la ferme qu'attire toutes les cocottes, demande pas si ça va, demande-moi si ça roule" ,
    "Dans l'équipe, que des vrais gars, sur l'matelas, que des vraies gow, des étoiles comme GTA, pervers comme Gepetto, discret comme la CIA et puissant comme le BHO",
    "J'rase mes couilles comme la tête de Britney, hydrate ta chatte avec du Pulco, problèmes de zgueg, j'vais voir mon kiné",
    "J'décroche même pas au téléphone, elle voudrait que je décroche la lune",
    "Pour les grosses asthmatiques, ma teub' fait Ventoline, le problème c'est que je t'aime mais que j'aime aussi tes copines",
    "Pour acheter des 20 balles ils font la manche et jouent de la flûte, les chiens sont plus propres que les babos qui s'en occupent",
    "J'enlève la combi partouze dans la soucoupe, elle a pas de teucha j'la mets dans les naseaux ",
    "Ohé-ohé-ohé-ohé-ohé-ohé-oh j'entends la flicaille qui patrouille dans nos rues, ohé-ohé-ohé-ohé-ohé-ohé-oh, mon meilleur client c'était Jean-Luc Delarue",
    "Les femmes, j'en parle au pluriel, séducteur comme Patrick Bruel, billets rangés dans l'caleçon pour donner l'odeur à mon oseille",
    "La pochette secrète dans la valise, comme le bon vieux Denis j'ai la malice",
    "J'passais mon temps à lover, maintenant j'fais des ronds, quelques pétasses à soulever, j'emmerde toujours les fédéraux",
    "Elle avale le truc, me dit qu'c'est son Yop, pas de soutif pour madame sous le crop top, ouais ouais ouais, mon sexe joue avec sa glotte, au bilboquet",
    "Au lit j'garde mon chapeau la meuf croit qu'j'ai des pouvoirs, que j'suis un super-héro...",
    "Les vieux mecs du hip-hop disent qu'on a eu d'la chance, ils se mentent à eux-même veulent pas prendre du recul, ça joue les anciens, ça prends trop la confiance , moi j'réponds pas aux clash, j'attends la canicule",
    "Je connais pas son nom mais je connais son point G, je pratique le bouche à bouche pourtant je sais même pas nager, baisse d'un ton, tu baises des thons",
    "La serveuse est grosse, j'laisse pas d'pourboire, y'a qu'mes poumons qu'ont le droit de m'en vouloir",
    "Fromage de ziz' dans ton naan cheese, tétons à l'air comme les nineties",
    "J'pouvais faire deux heures de route si ses parents étaient pas là, le plein pour se vider les couilles, la meuf c’était pas Shakira",
    "J'sais pas danser mamène mais j'couche avec les stars",
    "Ça joue les couples modèles devant les caméras, la nuit je tape dedans comme dans une Piñata",
    "Je traîne dans des villas plus grandes que ton village",
    "Pas d'télé j'suis trop explicite, Dorcel m'appelle me félicite",
    "Petits à l'école ils se faisaient frapper, pouvaient devenir quelqu'un mais sont devenus condé",
    "Pas la plus belle du monde mais la plus belle d'un soir, trop tard pour d'mander son nom, ses mollets sur mes épaules m'me lâche un clin d’œil dans le miroir",
    "Te payer ça coûte un rein, j'lui donne un rein j'ai pas d'pièces, j'suis trop bourré j'comprend plus rien, j'ai juste compris qu'on faisaient du sexe",
    "J'lui dis qu'j'suis défoncé, pas désolé, j'ai bu une douzaine de pintes j'pensais finir à l'usine, la tête est vide pas besoin de casque",
    "Une amatrice dans mon radar, j'vide la bouteille avec elle, pas la plus belle du monde mais la plus belle d'un soir",
    "J'tape dans des ivrognes et des cokés, j'le fais à main nue comme au hockey",
    "J'veux l'buzz, l'argent du buzz et même le cul de la streameuse",
    "T’as touché le fond et tu bouges plus comme un gode sans pile, j’fais mes bagages, je déménage, j’ai baisé toutes les gows d’la ville",
    "Pas très bavard, c’est ma queue qui en dit long",
    "J’suis comme un orphelin qu’habite à côté de chez ses parents, ma vie un court métrage où je joue le rôle du grand méchant",
    "J’suis le grand frère de Pascal le grand frère",
    "J’pensais à toi, elle t’arrive pas à la chatte cette pute de Shy'm",
    "Ma bite dans ton cul, tah Excalibur",
    "Les femmes sont des objets, je les compte pas parmis mes amis, t’es plus la même sans maquillage : j’pratique la polygamie",
    "Elle avale le truc, me dit qu’c’est son Yop, pas de soutif pour madame sous le crop top, ouais ouais ouais, mon sexe joue avec sa glotte au bilboquet"
    ]

    var lolo = [
    "https://i.imgur.com/HMMwVQN.gif",
    "https://i.imgur.com/GaixNNC.gif",
    "https://i.imgur.com/VTMXVhV.gif",
    "https://i.imgur.com/8GfeOJt.gif",
    "https://i.imgur.com/zSnUYgN.gif",
    "https://i.imgur.com/IGVZTyE.gif",
    "https://i.imgur.com/9CwdZ9m.gif",
    "https://i.imgur.com/8jTqSuJ.gif"
    ]
    const mamène = mam[Math.floor(Math.random() * mam.length)];
    const lorenzo = lolo[Math.floor(Math.random() * lolo.length)];
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setDescription(mamène)
        .setImage(lorenzo);
    message.channel.send({embed})
  }