exports.run = async (client, message) => {
let user = message.mentions.users.first();
  await message.channel.send({
    embed: {
      color: 0x7700cf,
      description: user.username + ', qu\'est-ce que tu viens de dire à propos de moi, ' +
                   'sale petite garce? Je dois te dire que j\'ai obtenu mon ' +
                   'diplôme de premier de ma classe de l\'École de l\'Ombre, ' +
                   'et je suis un Edgelord certifié, et j’ai plus de 300 tentatives ' +
                   'de suicide confirmées. Je suis entraîné à la guerre passive ' +
                   'agressive et je suis le meilleur dans le monde entier. Tu n\'es ' +
                   'rien pour moi, juste un autre thérapeute. Je vais m\'effacer ' +
                   'de moi-même avec précision ce qui n\'a jamais été vu auparavant ' +
                   'sur cette Terre, marquant mes mots. Tu penses pouvoir t\'en ' +
                   'tirer en m\'aidant par Internet ? Réfléchis encore, mêle-toi ' +
                   'de tes affaires. En ce moment même, je contacte mon réseau ' +
                   'secret d\'Edgelords à travers le monde souterrain et ton ' +
                   'groupe de soutien est en train d\'être mis à contribution, ' +
                   'donc tu ferais mieux de te préparer pour la tempête, l\'asticot. ' +
                   'La tempête qui effacera la pathétique petite chose que ' +
                   'j\'appelle ma vie. Je suis à bout de nerfs, gamin. Je peux ' +
                   'être n\'importe où, n\'importe quand, et je peux me tuer ' +
                   'de plus de sept cents façon, et ça juste avec mes mains nues. ' +
                   'Non seulement je suis très bien entraîné au suicide non armé, ' +
                   'mais j\'ai accès à tout l\'arsenal du magasin de cordes, et ' +
                   'je vais l\'utiliser à fond pour essuyer mon misérable cul de ' +
                   'la face du continent, parce que je suis une petite merde. ' +
                   'Si seulement tu avais su quel châtiment impie ton petit ' +
                   '"soutient" était sur le point de me faire subir, peut-être ' +
                   'que tu aurais tenu ta langue de bois. Mais tu n\'as pas pu, ' +
                   'tu ne l\'as pas fait, et maintenant j\'en paie le prix, ' +
                   'espèce d\'idiot. Je vais chier de culpabilité sur toi ' +
                   'et je vais me noyer dedans. Je suis putain de mort, gamin.'
    }
  });
};

exports.config = {
  aliases: [ 'edgy' ],
  enabled: true
};
