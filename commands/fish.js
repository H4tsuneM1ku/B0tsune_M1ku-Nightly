const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
const fishes = ['un poisson :fish:', 'un poisson tropical :tropical_fish:', 'un poisson globe :blowfish:', 'une botte :boot:', 'un coquillage :shell:'];
        const fish = fishes[Math.floor(Math.random() * fishes.length)];
        message.channel.send(`:fishing_pole_and_fish: Vous avez pêché et attrapé ${fish}`);
}
   
