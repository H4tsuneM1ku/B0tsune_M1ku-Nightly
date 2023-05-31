exports.run = function(client, message) {
    message.channel.send(`${message.author.username} est mort.`).then(Message => {
        setTimeout(() => { Message.edit("Réapparition..."); }, 5000);
        setTimeout(() => { Message.edit(`Renaissance terminée. Bon retour, ${message.author.username}.`); }, 5000);
    });
};