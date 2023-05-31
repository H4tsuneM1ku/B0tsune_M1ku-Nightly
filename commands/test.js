exports.run = (bot, msg, params = []) => {
  console.log("Test effectué");
  msg.reply("Test effectué");
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "test",
  description: "This is a test command. What does it do? ",
  usage: "test"
};
