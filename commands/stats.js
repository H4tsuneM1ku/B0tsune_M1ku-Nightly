const { version } = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTIQUES =
• Utilis. mém.  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Disponibilité :: ${duration}
• Utilisateurs  :: ${client.users.size.toLocaleString()}
• Serveurs      :: ${client.guilds.size.toLocaleString()}
• Salons        :: ${client.channels.size.toLocaleString()}
• OS hôte       :: ${os.type()} ${os.release()} (${os.arch()})
• Discord.js    :: v${version}
• Node          :: ${process.version}`, {code: "asciidoc"});
};

exports.aliases = ["botstats"];
