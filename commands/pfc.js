const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   let choice = args.join(' ').toLowerCase();
      const choices = ['feuille', 'pierre', 'ciseaux', choice, 'ciseaux', 'pierre', 'feuille', 'pierre', 'ciseaux', 'feuille'];
        const response = choices[Math.floor(Math.random() * choices.length)];
        if (!choice) {
          return message.channel.send("Vous devez faire un choix entre pierre, feuille et ciseaux.")                                         
        }  else if (choice === 'pierre') {
            if (response === 'pierre') return message.reply('j\'ai choisi pierre et vous avez choisi pierre. \n Oh non c\'est une égalité !');
            else if (response === 'feuille') return message.reply('j\'ai choisi feuille et vous avez choisi pierre. \n La feuille gagne !');
            else return message.reply('j\'ai choisi ciseaux et vous avez choisi pierre. \n La pierre gagne !');
        } else if (choice === 'feuille') {
            if (response === 'pierre') return message.reply('j\'ai choisi pierre et vous avez choisi feuille \n La feuille gagne !');
            else if (response === 'feuille') return message.reply('j\'ai choisi feuille et vous avez choisi feuille. \n Oh non c\'est une égalité !');
            else return message.reply('j\'ai choisi ciseaux et vous avez choisi feuille. \n Les ciseaux gagnent !');
        } else if (choice === 'ciseaux') {
            if (response === 'pierre') return message.reply('j\'ai choisi pierre et vous avez choisi ciseaux. \n La pierre gagne !');
            else if (response === 'feuille') return message.reply('j\'ai choisi feuille et vous avez choisi ciseaux. \n Les ciseaux gagnent !');
            else return message.reply('j\'ai choisi ciseaux et vous avez choisi ciseaux. \n Oh non c\'est une égalité !');
        } else {                                 
            if (response === 'pierre') return message.reply('j\'ai choisi pierre et vous avez choisi ' + choice + '.\n La pierre gagne !');
            else if (response === 'feuille') return message.reply('j\'ai choisi feuille et vous avez choisi ' + choice + '.\n La feuille gagne !');
            else if (response === 'ciseaux') return message.reply('j\'ai choisi ciseaux et vous avez choisi ' + choice + '.\n Les ciseaux gagnent !');
            else if (response === choice) return message.reply('j\'ai choisi ' + choice + ' et vous avez choisi ' + choice + '.\n Oh non c\'est une égalité !');
  }
}