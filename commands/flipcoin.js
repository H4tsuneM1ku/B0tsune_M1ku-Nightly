const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  try {
    var number = parseInt(args[0]);
    const wonamount = (Math.round(number * 1.25))
    var headsortails = args.slice(1).join("")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
      var coinflips = ['Face!','Pile!'];
      const coinflip = coinflips[Math.floor(Math.random () * coinflips.length)];
      if (coinflip === 'Face!' && headsortails === "face") {
        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("La pièce a tournée et a atterri sur face, vous avez gagné $" + wonamount + ".")
      } else if (coinflip === 'Face!' && headsortails === "pile") {
        sql.run(`UPDATE profiles SET cash = ${row.cash -= number} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("La pièce a tournée et a atterri sur face, vous avez perdu $" + number + ".")
      } else if (coinflip === 'Pile!' && headsortails === "pile") {
        sql.run(`UPDATE profiles SET cash = ${row.cash += wonamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("La pièce a tournée et a atterri sur pile, vous avez gagné $" + wonamount + ".")
      } else if (coinflip === 'Pile!' && headsortails === "face") {
        sql.run(`UPDATE profiles SET cash = ${row.cash -= number} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("La pièce a tournée et a atterri sur pile, vous avez perdu $" + number + ".")
      } else {
        message.channel.send("Cette option n'a pas été trouvée, voici la commande n.flipcoin [pari] [face/pile]")
      }
    })
  } catch (err) {
    console.log(err)
  } 
}
   
