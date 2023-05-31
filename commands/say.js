exports.run = (client, message) => {
  if (message.mentions.channels.size == 0) {
    message.reply("Veuillez mentionner un channel.");
}
else {
    let mChannel = message.mentions.channels.first();
    // Get the message to print

    const argsresult = message.content.split(" ").slice(2);
    let saytext = argsresult.join(" ");
    mChannel.send(saytext);
    message.channel.send(`Votre message **${saytext}** a bien été envoyé dans ${mChannel}`)
}
};

