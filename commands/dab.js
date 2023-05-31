const request = require('request-promise-native');

exports.run = async (client, message) => {
  let options = {
    url: 'http://api.giphy.com/v1/gifs/search',
    qs: {
      q: 'dab',
      api_key: 'dc6zaTOxFJmzC',
      limit: 50,
      offset: 0
    },
    json: true
  };

  let response = await request(options);

  if (!response.data.length) {
    return client.emit('Une erreur est survenue.');
  }

  await message.channel.send({
    embed: {
      color: 0x7700cf,
      title: `${client.user.username} effectue le dab.`,
      image: {
        url: response.data[Math.floor(Math.random() * response.data.length)].images.original.url
      },
      footer: {
        text: 'Powered by GIPHY'
      }
    }
  });
};