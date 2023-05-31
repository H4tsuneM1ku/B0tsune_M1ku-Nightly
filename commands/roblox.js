const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch')
exports.run = (client, message, args) => {
        let saybot = args.join('_');
        const url = `https://api.roblox.com/users/get-by-username?username=${saybot}`;
        snekfetch.get(url).then(result => {
              const data = result.body.Id;
              if (saybot.length < 1) return message.channel.send("Vous devez donner un nom d'utilisateur pour utiliser cette commande.")
              if (result.body.Id === "undefined") return message.channel.send("Je ne trouve pas d'utilisateur Roblox au nom de " + saybot)
              const url2 = `https://api.roblox.com/ownership/hasasset?userId=${data}&assetId=102611803`;
              snekfetch.get(url2).then(a => {
                const Verifiedcheck = a.body
                  const embed = new Discord.RichEmbed()
                  .setColor(0x00A2E8)
                  .setTitle("Nom d'utilisateur: " + saybot)
                  .setDescription("ID utilisateur: " + data)
                  .addField("Vérifié", Verifiedcheck)
                  .setFooter("Lien profil: " + `https://web.roblox.com/users/${data}/profile`)
                  .setThumbnail("https://roblox.com/Thumbs/BCOverlay.ashx?username=" + saybot)
                  .setImage("http://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + saybot);
                  message.channel.send({embed}).catch(console.error);
                })
            }) 
  };