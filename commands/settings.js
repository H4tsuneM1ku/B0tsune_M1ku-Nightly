const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle("Paramètres du serveur")
        .addField("Général", `Préfix: ${row.prefix}`)
        .addField("Messages", `Message de bienvenue: ${row.welcomemessage} \nMessage d'adieu: ${row.leavemessage}`)
        .addField("Salons", `Salon de bienvenue/adieu: ${row.wlchannel} \nSalon des logs: ${row.logschannel}`)
        .addField("Modération", `Anti invite: ${row.invitelinkprotection} \nAnti liens internet: ${row.websitelinkprotection} \nAnti duplication: ${row.dupcharactersprotection} \nSlowmode: ${row.slowmode} \nCommandes Mods Uniquement: ${row.modonlycommands}`)
        .addField("Autres", `Anti join: ${row.antijoin} \nAutorole: ${row.autoroleenabled}\nSystème de Profil/Niveaux/Argent: ${row.levelsystem}`);
      message.channel.send(embed)
    })
}