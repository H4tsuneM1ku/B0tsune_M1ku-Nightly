const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
    const slots = [':grapes:', ':cherries:', ':lemon:'];
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    const slotfour = slots[Math.floor(Math.random() * slots.length)];
    const slotfive = slots[Math.floor(Math.random() * slots.length)];
    const slotsix = slots[Math.floor(Math.random() * slots.length)];
    const slotseven = slots[Math.floor(Math.random() * slots.length)];
    const sloteight = slots[Math.floor(Math.random() * slots.length)];
    const slotnine = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree || slotfour === slotfive && slotfour === slotsix || slotseven === sloteight && slotseven === slotnine) {
        const won = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .addField("Ligne 1", `${slotfour}|${slotfive}|${slotsix}`)
            .addField("Ligne 2", `${slotOne}|${slotTwo}|${slotThree}`)
            .addField("Ligne 3", `${slotseven}|${sloteight}|${slotnine}`)
            .setFooter("Wow! " + message.author.username + " a gagné! Beau travail!");
        message.channel.send(won)
    } else {
        const lost = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .addField("Ligne 1", `${slotfour}|${slotfive}|${slotsix}`)
            .addField("Ligne 2", `${slotOne}|${slotTwo}|${slotThree}`)
            .addField("Ligne 3", `${slotseven}|${sloteight}|${slotnine}`)
            .setFooter("Awww " + message.author.username + " a perdu. Ça craint!");
        message.channel.send(lost)
    }
}
