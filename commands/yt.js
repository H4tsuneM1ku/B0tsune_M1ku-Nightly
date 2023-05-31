const yt = require('youtube-dl');

exports.run = async (client, message, args) => {
  if (!args.length) {

    var video = [
      "Suna no Wakusei - Hatsune Miku",
      "Space Bound - Eminem",
      "Unsainted - Slipknot",
      "Nique la BAC - Lorenzo",
      "MEOW",
      "MOO",
      "PewDiePie",
      "Ghost Recon Breakpoint",
      "Wankil Studio",
      "Pomme de terre",
      "Hatsune Miku",
      "Discord",
      "Deadpool",
      "Dragon Ball Z",
      "Far Cry 5",
      "https://www.youtube.com/watch?v=TNHsw8TLf6Y",
      "https://www.youtube.com/watch?v=jg-weaFxxMo"
    ]
    const exemple = video[Math.floor(Math.random() * video.length)];
    return message.channel.send('Veuillez entrer une vidéo à rechercher.\n' + `Exemple: n.yt ${exemple}`);
  }
  message.channel.startTyping();
  args = `ytsearch:${args.join(' ')}`;
  await yt.getInfo(args, [ '-q', '--skip-download', '--no-warnings', '--format=bestaudio[protocol^=http]' ], async (err, info) => {
    if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
      let errorMessage;
      if (err && err.stack.includes('Aucun résultat de vidéos')) {
        errorMessage = 'Erreur lors de la recherche: `Aucun résultat`.';
      }
      else {
        errorMessage = 'Erreur lors de la recherche: `Aucun résultat`.';
      }
      return message.channel.send({
        embed: {
          color: 0xff0000,
          title: 'Aucun résultat :pensive:',
          description: `Aucune vidéo n'a été trouvée pour **${args}**.\nSi vous pensez rechercher la bonne vidéo, essayez d'ajouter des détails tel que le nom de l'auteur dans la recherche et essayez encore.`
        }
      });
    }

    const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle(info.title, `https://youtu.be/${info.id}`)
    .setDescription(info.description)
    .setAuthor(`YouTube - ${info.uploader}`, 'https://i.imgur.com/hkUafwu.png')
    .setURL(`https://youtu.be/${info.id}`)
    .setImage(info.thumbnail)
    .setFooter(info.is_live ? 'En Live' : `Durée de la vidéo: ${info.duration}`,)
    .addField('J\'aimes', `${info.like_count}`, true)
    .addField('Je n\'aime pas', `${info.dislike_count}`, true)
    .addField('Vues', `${info.view_count}`, true)
    .addField('Mise en ligne', `${moment(info.upload_date).format('LLL')}`, true);
    message.channel.stopTyping();
    await message.channel.send({embed})
    });
  };
