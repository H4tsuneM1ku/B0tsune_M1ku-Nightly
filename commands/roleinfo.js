const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    let roletocheck = args.join(" ")
    let role = client.guilds.get(message.guild.id).roles.find('name', roletocheck);
    if (!role) return message.channel.send("Le rôle n'a pas été trouvé sur le serveur.")
    //const serialized = role.permissions.serialize();
    //const perms = Object.keys(permissions).filter(perm => serialized[perm]);
      const embed = new Discord.RichEmbed()
      .setColor(0x7700cf)
      .addField('Nom du rôle', `${role.name}`, true)
      .addField('ID du rôle', `${role.id}`, true)
      .addField('Créé le', role.createdAt.toDateString())
      .addField("Mentionnable: ", role.mentionable ? 'Oui' : 'Non')
      //.addField('Permissions' , perms.map(perm => permissions[perm]).join(', ') || 'None')
      message.channel.send({embed}) 
}