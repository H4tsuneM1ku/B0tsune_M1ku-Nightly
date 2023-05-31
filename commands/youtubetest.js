/**
 * @file youtubeSearch command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const yt = require('youtube-dl');

exports.run = async (client, message, args) => {
  if (!args.length) {
    return client.emit('commandUsage', message, this.help);
  }

  args = `ytsearch:${args.join(' ')}`;
  await yt.getInfo(args, [ '-q', '--skip-download', '--no-warnings', '--format=bestaudio[protocol^=http]' ], async (err, info) => {
    if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
      let errorMessage;
      if (err && err.stack.includes('Aucun résultat de vidéos')) {
        errorMessage = client.i18n.error(message.guild.language, 'notFound', 'video');
      }
      else {
        errorMessage = client.i18n.error(message.guild.language, 'connection');
      }
      return client.emit('error', '', errorMessage, message.channel);
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

    await message.channel.send({embed})
      /*embed: {
        color: 0x7700cf,
        author: {
          name: info.uploader,
          url: info.uploader_url
        },
        title: info.title,
        url: `https://youtu.be/${info.id}`,
        fields: [
          {
            name: 'J\'aimes',
            value: `${info.like_count}`,
            inline: true
          },
          {
            name: 'Je n\'aime pas',
            value: `${info.dislike_count}`,
            inline: true
          },
          {
            name: 'Vues',
            value: `${info.view_count}`,
            inline: true
          }
        ],
        image: {
          url: info.thumbnail
        },
        footer: {
          text: info.is_live ? 'En Live' : `Durée: ${info.duration}`,
          url: 'https://i.imgur.com/hkUafwu.png'
        }
      }*/
    });
  };


exports.config = {
  aliases: [ 'ytsearch' ],
  enabled: true
};

exports.help = {
  name: 'youtubeSearch',
  description: 'Searches for a video, for the specified query, on YouTube and shows the first result.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'youtubeSearch <text>',
  example: [ 'youtubeSearch Call of Duty WW2' ]
};
