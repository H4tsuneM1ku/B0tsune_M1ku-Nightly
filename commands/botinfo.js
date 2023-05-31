const Discord = require('discord.js');

exports.run = (client, message, args) => {
    fs.readdir("./commands/", (err, files) => {
    const filez = files.length
    const { version } = require("discord.js");
    const bversion = "1.0";
    const nversion = process.version;
    let cpuStat = require("cpu-stat");
    let os = require('os');
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
        return console.log(err);
    }
})

    var infobot = new Discord.RichEmbed()
        .setAuthor(client.user.tag)
        .setThumbnail(`https://i.imgur.com/1RcLKlI.gif`)
        .addField("📦 • __Versions__", "NodeJS : " + "`" + `${nversion}` + "`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "\n" + "Bot : " + "`" + `v${bversion}` + "`" + "", true)
        .addField("📋 • __Statistiques__", "`Serveurs : "+client.guilds.size+"`" + "\n `Utilisateurs : " +client.users.size+"`" + "\n `Commandes : " +filez+"`", true)
        .addField("📌 • __Développeur__", "`Black Hanekawa#9999`", true)
        .addField("📊 • __Système__", "Plateforme : " + "`" + `${os.type()} ${os.release()}`+ "` \n Arch : " + "`" + `${os.arch()}` + "`")
        //.addField("💻 • __Processeur__", "CPU : " + "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "` \n RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB` | Latence avec l'API :" + "`" + `${Math.round(client.ping)}` + " ms`")
        .addField("💻 • __Processeur__", "CPU : " + "`" + "`Intel(R) Core(TM) i9-9900K CPU @ 5.00GHz`" + "` \n RAM: " + "`" + `64536` + "MB` | Latence avec l'API :" + "`" + `${Math.round(client.ping)}` + " ms`")
        .addField("⚡ • __En ligne depuis__", (Math.round(client.uptime / (1000 * 60 * 60))) + ' heures  ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minutes ' + (Math.round(client.uptime / 1000) % 60) + ' secondes ', true)
        .addField("🔗 • __Liens__", "[Inviter le bot](https://discordapp.com/oauth2/authorize?client_id=611567484159655936&scope=bot&permissions=8) | [Serveur Support](https://discord.gg/rdWCjAC)", true)
        .setColor("#2A2A32")
    message.channel.send(infobot)
})
}
