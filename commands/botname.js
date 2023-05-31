exports.run = (client, message, args) => {
  if (message.author.id == "258394351628058636") {
    let username = args.join(' ');
      if (username.length < 1) return message.reply('vous devez donner un nom d\'utilisateur pour le client.')
       client.user.setUsername(username);
        const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .addField("Nom d'utilisateur défini avec succès!", username + " est le nouveau nom d'utilisateur du bot. :white_check_mark:");
      message.reply({embed})
  } else {
        message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
  }
}