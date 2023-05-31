const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
const prefixtouse = row.prefix
const usage = new Discord.RichEmbed()
  .setColor(0x7700cf)
  .setThumbnail(client.user.avatarURL)
  .setTitle("Commande: " + prefixtouse + "purge")
  .addField("Utilisation", prefixtouse + "purge <montant> @Someone")
  .addField("Exemple", prefixtouse + "purge 20 le serveur a été raid.")
  .setDescription("Description: " + "Purges les messages des channels (min 3 max 99)");

 let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
 if (!message.member.permissions.has("MANAGE_MESSAGES")) {
   message.channel.send('Désolé, vous n\'avez pas la permission d\'utiliser la commande purge. :x:');
   return;
 } else if (!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
   message.channel.send("Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission MANAGE_MESSAGES. :x:");
   return;
 }
const user = message.mentions.users.first()
const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1])
let reason = args[3] || `Le modérateur n'a pas donné de raison.`;
if (!amount) return message.channel.send(usage);
if (!amount && !user) return message.channel.send(usage);
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
   const filterBy = user ? user.id : client.user.id;
   messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount + 1);
 }
 if (amount <= 2) return message.channel.send("Je peux uniquement supprimer un minimum de 2 messages.")
 if (amount >= 98) return message.channel.send("Je peux uniquement supprimer un maximum de 98 messages.")
 message.channel.bulkDelete(messages, true).catch(error => console.log(error.stack));
 message.channel.send("***Les messages/messages des utilisateurs du serveur ont été purgés avec succès! :white_check_mark:***")
 const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Purge")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("Montant de la purge", amount)
    .addField("Dans le channel", message.channel.name, true)
    .addField("Raison", reason, true)
    .setFooter("Heure d'utilisation: " + message.createdAt.toDateString())
   if (!modlog) return;
   if (row.logsenabled === "disabled") return;
     return client.channels.get(modlog.id).send({embed});
        })
    })
}
   
