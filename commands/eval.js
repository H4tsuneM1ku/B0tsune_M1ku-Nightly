const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
        if(message.author.id !== "258394351628058636") return message.channel.send("Seul le développeur du bot peut utiliser cette commande.")
    try {
      var code = args.join(" ");
      if (code === "client.token") return message.channel.send("Je n'ai pas envie de faire ça 0_0")
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)
        .addField(":outbox_tray: Sortie: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
      message.channel.send({embed})
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: Sortie: ", `\`\`\`${clean(err)}\`\`\``)
    message.channel.send({embed})
    }

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
  }
}