const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Désolé, vous n'avez pas les permissions pour exécuter la commande clean.");
      let num = (!!args.slice(0).join(' ')) ? parseInt(args.slice(0).join(' ')) || 99 : 99;
      message.channel.fetchMessages({limit:num}).then(messages => {
      let ms = messages.filter(m => m.author.id === client.user.id);
      if (ms.size === 1) { ms.first().delete(); return message.channel.send("**Les messages de B0tsune_M1ku Nightly ont été effacés**") }
      if (ms.size < 1) return message.channel.send("**Aucun message trouvé à nettoyer**")
      message.channel.bulkDelete(ms, true).then(() => message.channel.send("**Les messages de B0tsune_M1ku Nightly ont été effacés**"))
  })
}
   
