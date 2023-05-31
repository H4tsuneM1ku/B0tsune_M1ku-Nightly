const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = async (client, message, args) => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
  const usage = new Discord.RichEmbed()
            .setColor(0x7700cf)
            .setThumbnail(client.user.avatarURL)
            .setTitle("Commande: " + prefixtouse + "hackban")
            .addField("Utilisation", prefixtouse + "hackban <ID> <raison>")
            .addField("Example", prefixtouse + "hackban 130515926117253122 SelfBot qui DM des liens d'invitation et quitte.")
            .setDescription("Description: " + "Banni un utilisateur sans besoin qu'il soit sur le serveur");

  if (message.member.hasPermission("BAN_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Désolé, je n\'ai pas les permissions pour faire cette commande. J\'ai besoin de la permission BAN_MEMBERS. :x:')
  let user = args[0]
  if (isNaN(user)) return message.channel.send(usage)
  let reason = args[1] || `Le modérateur n'a pas donné de raison.`;
  if (isNaN(user)) return message.channel.send(usage)
  if (!user) return message.reply('vous devez donner un User Resolvable, tel qu\'un ID utilisateur.')
  let guild = message.member.guild;
  if (user.length < 1) return message.channel.send("Vous devez donner un ID utilisateur valide pour le bannir.");
  if (user === message.author.id) return message.channel.send(`:x: Eh bien non, vous ne pouvez pas vous hackban vous-même.`);
  if (message.guild.members.get(user)) return message.channel.send(`:x: Cet utilisateur est sur le serveur, utilisez ban à la place.`);
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  message.guild.ban(user, 2);
  sql.run(`UPDATE scores SET casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Casier #" + row.casenumber + " | Action: Hack Ban")
    .addField("Modérateur", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("ID utilisateur", user)
    .addField("Raison", reason, true)
    .setFooter("heure d'utilisation: " + message.createdAt.toDateString())
  message.channel.send("ID: " + user + ", a été banni du serveur.")
  if (!modlog) return;
  client.channels.get(modlog.id).send({embed});
    }
  })
}
   
