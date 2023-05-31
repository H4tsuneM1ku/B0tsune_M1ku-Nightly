/**
 * @file fakeBan command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.run = async (client, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
    reason = args.slice(1).join(' ');
  }
  else if (args.id) {
    user = await client.fetchUser(args.id);
  }
  if (!user) {
    return client.emit("Veuillez mentionner l'utilisateur à bannir.");
  }
  if (!reason) {
    return client.emit("Veuillez donner une raison.");
  }

  await message.channel.send({
    embed: {
      color: 0x7700cf,
      description: `**${user.tag}** a été warn par **${message.author.tag}**.\nRaison du warn: **${reason}**.`,
      footer: {
        text: `Sauf que c\'est juste une blague.`
      }
    }
  });
};