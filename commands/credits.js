const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
      const embed = new Discord.RichEmbed()
      .setColor(0x7700cf)
      .addField("Développeur", "Zdradamus#9999")
      .addField("Connu sous les noms de", "H4tsune_M1ku \nDr LACHATTE \nHy0scine \nＶ！ｒｔｕａｌ_ＣＨ▲ＳΣ \n𝘼𝙇𝙆×𝙋𝙊𝙏𝙀 💦")
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
 }
   
