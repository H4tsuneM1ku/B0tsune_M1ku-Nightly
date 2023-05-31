exports.run = async (client, message, args, emoji) => {
    function emoji (id) {
        return client.emojis.get(id).toString();
    }
    message.channel.send(emoji("649623144268562454"));
}