/**
 * @file fakeBan command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.run = async (client, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await client.fetchUser(args.id);
  }
  if (!user) {
    return client.emit("Veuillez mentionner l'utilisateur à bannir.");
  }

  await message.channel.send({
    embed: {
      color: 0x7700cf,
      description: `**${message.author.tag}** a banni **${user.tag}** du serveur.`,
      footer: {
        text: 'Oh, c\'est juste une blague.'
      }
    }
  });
};