exports.run = (client, message, args) => {
  if (message.author.id == "258394351628058636") {
    if(!args || args.size < 1) return message.reply("vous devez fournir un nom de commande pour recharger.");
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send(`La commande **${args[0]}** a bien été rechargée. :ballot_box_with_check:`);
  } else {
 	 message.reply("vous n'avez pas les autorisations substantielles. Développeur du bot uniquement. :x:");
 	}
}