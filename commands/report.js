const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {

var cooldownUsers = [];

const checkCooldown = ((userId) => {
    if (cooldownUsers.indexOf(userId) > -1) {
        return true;
    } else {
        return false;
    }
});

const removeCooldown = ((userId, timeInSeconds) => {
    let index = cooldownUsers.indexOf(userId);
    if (index > -1) {
        setTimeout(() => {
            cooldownUsers = cooldownUsers.splice(index, 0);
        }, timeInSeconds * 1000)
    }
});

if (checkCooldown(message.author.id)) {
    message.channel.send("Désolé! Veuillez patienter encore 10 secondes pour rapporter à nouveau.");
    return;
}
cooldownUsers.push(message.author.id);
removeCooldown(message.author.id, 10000);
    let member = message.mentions.members.first();
    if (message.author.id == member.id) return message.channel.send("Vous ne pouvez pas vous rapporter. :x:")
    let reason = args.slice(1).join(" ") || `Le modérateur n'a pas donné de raison.`;
    if (message.mentions.users.size < 1) return message.channel.send("Vous n'avez pas mentionné d'utilisateur à rapporter.")
    let modlog = message.guild.channels.find('name', "reports");
    const embed = new Discord.RichEmbed()
        .setColor(0x7700cf)
        .setTitle("Action: Report")
        .addField("Rapporté par:", message.author.tag + " (ID: " + message.author.id + ")")
        .addField("Utilisateur rapporté:", member.user.username + " (ID: " + member.id + ")")
        .addField("Raison", reason, true)
        .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
        if (!modlog) return;
  message.channel.send("L'utilisateur a été rapporté, la requête sera bientôt vérifiée.")
  client.channels.get(modlog.id).send({embed});
}
