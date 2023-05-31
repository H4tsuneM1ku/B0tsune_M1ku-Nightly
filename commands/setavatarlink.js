exports.run = async (client, message, args) => {
  if (!/^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i.test(args.join(' '))) {
    return message.reply('Veuillez entrer un URL image valide.');
  }

  await client.user.setAvatar(args.join(' '));

  await message.channel.send({
    embed: {
      color: 0xfc0303,
      description: `Avatar de ${client.user.username} changé!`
    }
  }).catch(e => {
    client.log.error(e);
  });
};