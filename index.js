// les variables qui concernent le bot entier
global.ownerID = "258394351628058636";
global.util = require('util');
// création du client
global.Discord = require('discord.js');
global.bot = new Discord.Client();
global.guild = new Discord.Client();
global.moment = require('./moment.js')
const Commando = require('discord.js-commando');
const client = new Commando.Client({
  disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"],
  disableEveryone: true,
  messageCacheMaxSize: 150,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
  commandPrefix: 'n.', // prefix
  owner: '258394351628058636', // owner's id
  unknownCommandResponse: false,
});
const fs = require("fs");
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const invitecheck = ["discord.gg", "discord.me", "discord.io/", "discordapp.com/invite"]
const weblinkcheck = ["http", "www.", ".com", ".net", ".org", ".ca", ".co.uk"]
const config = require("./assets/jsons/config.json");
const Canvas = require('canvas');
const snekfetch = require("snekfetch");

settings = require("./assets/jsons/settings.json");
http = require ('https'),
dev = "Zdradamus#9999";
global.prefix = (settings.prefix);

const activities_list = [
  "n.help", 
  "créer de nouvelles commandes | n.help",
  "faire une restauration de la base de données | n.help", 
  "corriger des bugs | n.help",
  `supprimer le dossier node_modules | n.help`,
  'bot.user.setActivity("( ͡° ͜ʖ ͡°)") | n.help',
  "B0tsune_M1ku Nightly v1.0 | n.help",
  "Si tu vois ce message, c'est que tu es gay | n.help"
  //"Coucou Nyx ♥ | n.help"
  ]; // creates an arraylist containing phrases you want your bot to switch through.

  // event ready, qui prépare le bot
bot.on('ready', () => {
  console.log("[bot.on] Bot lancé.");
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      bot.user.setActivity(activities_list[index], { type: 'PLAYING', url: "https://www.twitch.tv/h4tsune_m1ku"}); // sets bot's activities to one of the phrases in the arraylist.
  }, 15000); // Runs this every 10 seconds.
});

client.on('ready', () => {
    console.log('[client.on] Bot lancé.');
});

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

client.on('uncaughtException', (err) => {
    console.log("Uncaught Exception: " + err)
    process.exit(1)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});

client.on('disconnect', () => {
  console.warn('Disconnected!')
  process.exit(0);
})

client.on('reconnecting', () => console.warn('Reconnecting...'))

const talkedRecently = new Set();

const talkedRecently2 = new Set();


var cooldownUsers = [];

const checkCooldown = ((userId) => {
  if(cooldownUsers.indexOf(userId) > -1) {
    return true;
  } else {
    return false;
  }
});

const removeCooldown = ((userId, timeInSeconds) => {
  let index = cooldownUsers.indexOf(userId);
  if(index > -1) { 
    setTimeout(() => {
      cooldownUsers = cooldownUsers.splice(index, 0);
    }, timeInSeconds * 1000)
  }
});

fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
      const event = require(`./events/${f}`);
      client.on(f.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${f}`)];
  });
});

client.on("guildCreate", async (guild) => {
  try {
  console.log(`Quelqu'un a ajouté B0tsune_M1ku Nightly sur son serveur! Nom du serveur: ${guild.name} Nombre de membres: ${guild.memberCount} Possédé par: ${guild.owner.user.username}!`)
  const owner = guild.owner.user
  var guildMsg = [
      "1. Le préfixe par défaut de B0tsune_M1ku Nightly est `n.`.\n",
      "2. Les commandes ne fonctionneront pas dans les messages privés.\n",
      "3. Définissez les messages de bienvenue et d'adieu avec `n.welcomeleave`.\n",
      "4. Définissez le salon des logs avec `n.logs [nom du salon]`.\n",
      "5. Définissez l’autorole avec `n.autorole [nom du rôle]`.\n",
      "6. Le préfixe peut être modifié avec `n.prefix [nouveau préfixe]`.\n",
      "7. Le système de profil peut être activé avec `n.profilesystem`.\n",
      "8. Automod peut être activé avec `n.automod enable all`."
  ]
  const embed = new Discord.RichEmbed()
    .setColor(0x7700cf)
    .setTitle("Merci de m’avoir ajouté à votre serveur. Voici quelques conseils pour débuter...")
    .setDescription(guildMsg)
  owner.send(embed)
} catch (err) {
  return;
}
});

client.on('guildDelete', (guild) => {
  console.log(`Quelqu'un à retiré B0tsune_M1ku Nightly de son serveur! Nom du serveur: ${guild.name} Nombre de membres: ${guild.memberCount} Possédé par: ${guild.owner.user.username}!`)
  sql.run(`DELETE FROM scores WHERE guildId = ${guild.id}`)
});

client.on("guildMemberAdd", (member) => {
  if (!member.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
    if (!member.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!member.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
  sql.get(`SELECT * FROM scores WHERE guildId ="${member.guild.id}"`).then(row => {
    if (row.antijoin === "enabled") {
      member.user.send("L'anti-join a été activé dans " + member.guild.name + " vous avez été expulsé automatiquement.")
      member.guild.member(member.user.id).kick().catch(console.error);
    } else {
      if (!member.guild.member(client.user).hasPermission('MANAGE_ROLES')) return;
        let autoRole = client.guilds.get(member.guild.id).roles.find(r => r.name == row.roletogive);
        if (!autoRole) return
        member.guild.member(member.user.id).addRole(autoRole).catch(console.error);
    }
    })
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === '⭐') {
    let message = reaction.message
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;

    if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
    if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;
    if (message <= 1) return;
    if (message.guild.id === "110373943822540800") return;
    if (message.guild.id === "264445053596991498") return;
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(0x00A2E8)
      .setTitle(`⭐ ${client.user.username} Starboard ⭐`)
      .addField('Starred By', `${user.username}`, true)
      .addField('Channel', `${message.channel}`, true)
      .addField('Message', `${message.content}`, false)
      .setTimestamp()
    let modlog = message.guild.channels.find(channel => channel.name == 'starboard');
    if (!modlog) return
    if (user.id === message.author.id) return message.channel.send(`${message.author}, Vous ne pouvez pas étoiler votre propre message!`)

    reacts = message.reactions.filter(function (reacts) {
      return reacts.emoji.name === '⭐'
    })
    if (reacts.length > 1) return;
    client.channels.get(modlog.id).send({embed}).catch(console.error);
  }
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
  if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
  if (!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
  if (!message.guild.member(client.user).hasPermission('READ_MESSAGE_HISTORY')) return;

  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    if (!row) return;

    const prefix = row.prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

  if (message.content.startsWith("<@" + client.user.id +">") || message.content.startsWith("<@!" + client.user.id +">")) {
    message.reply("le préfixe actuel du serveur est `" + row.prefix + "`.")
  }

  if (invitecheck.some(word => message.content.toLowerCase().includes(word))) {
  if (message.content.includes(row.prefix)) return
  if (row.automoderation === "disabled") return;
  if (row.invitelinkprotection === "disabled") return;
  if (message.member.hasPermission("KICK_MEMBERS")) return;
  message.delete()
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Action: Auto Moderation")
    .addField("Modérateur", client.user.username + " (ID: " + client.user.id + ")")
    .addField("Utilisateur", message.author.username + " (ID: " + message.author.id + ")")
    .addField("Dans le salon", message.channel.name, true)
    .addField("Raison", "Lien d'Invitation", true)
    .addField("Lien d'Invitation", message.cleanContent)
    .setFooter("Temps écoulé: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
    message.reply(" n'est pas autorisé à poster des invitations.").then((response) => {
      response.delete(6000);
      });
}

  if (weblinkcheck.some(word2 => message.content.toLowerCase().includes(word2))) {
  if (message.content.includes(row.prefix)) return
  if (row.automoderation === "disabled") return;
  if (row.websitelinkprotection === "disabled") return;
  if (message.member.hasPermission("KICK_MEMBERS")) return;
  message.delete()
  let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setTitle("Action: Auto Moderation")
    .addField("Modérateur", client.user.username + " (ID: " + client.user.id + ")")
    .addField("Utilisateur", message.author.username + " (ID: " + message.author.id + ")")
    .addField("Dans le salon", message.channel.name, true)
    .addField("Raison", "Lien vers un site web", true)
    .addField("Lien du site web", message.cleanContent)
    .setFooter("Temps écoulé: " + message.createdAt.toDateString())
    if (!modlog) return;
    if (row.logsenabled === "disabled") return;
    client.channels.get(modlog.id).send({embed});
    message.reply(" not allowed to post website links.").then((response) => {
      response.delete(6000);
      });
  }

   if (message.content.includes('')) {
    if (message.content.includes(row.prefix)) return
    if (row.automoderation === "disabled") return;
    if (row.dupcharactersprotection === "disabled") return;
      if (message.member.hasPermission("KICK_MEMBERS")) return;
      const check1 = args.join(" ")
      if (check1.includes('.')) return;
      var hasDuplicates = /([a-zA-Z])\1+$/;
      const result = hasDuplicates.test(check1)
      if (result === true) { 
        message.delete()
        let modlog = message.guild.channels.find(channel => channel.name == row.logschannel);
        const embed = new Discord.RichEmbed()
          .setColor(0x00A2E8)
          .setTitle("Action: Auto Moderation")
          .addField("Modérateur", client.user.username + " (ID: " + client.user.id + ")")
          .addField("Utilisateur", message.author.username + " (ID: " + message.author.id + ")")
          .addField("Dans le salon", message.channel.name, true)
          .addField("Raison", "Duplication", true)
          .addField("Contenu du message", message.cleanContent)
          .setFooter("Temps écoulé: " + message.createdAt.toDateString())
          if (!modlog) return;
          if (row.logsenabled === "disabled") return;
          client.channels.get(modlog.id).send({embed});
          let user = message.guild.member(message.mentions.users.first())
        message.reply(" message contains duplicated characters.").then((response) => {
          response.delete(6000);
          });
    } 
  }

  if (message.content.includes('')) {
      if (message.member.hasPermission("KICK_MEMBERS")) return;
      if (row.slowmode === "disabled") return;
      if (row.slowmode === "enabled") {
        if(checkCooldown(message.author.id)) {
          message.delete();
         }
      cooldownUsers.push(message.author.id);
      removeCooldown(message.author.id, row.slowmodetime);
      } 
     } 
    })

    if (message.content.startsWith("")) {
      sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
        if (!row2) return;
        if (row2.levelsystem === "disabled") return;
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
          if (!row) return;
          if (row.level === 25) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":tada:")) return;
             sql.run(`UPDATE profiles SET awards = "${row.rewards + ":tada:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.level === 50) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":medal:")) return;
          sql.run(`UPDATE profiles SET awards = "${row.awards + " :medal:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.level === 100) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":trophy:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :trophy:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.cash >= 10000) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":moneybag:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :moneybag:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else if (row.cash >= 100000) {
            if (row.awards.includes("None")) return sql.run(`UPDATE profiles SET awards = "" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
            if (row.awards.includes(":credit_card:")) return;
            sql.run(`UPDATE profiles SET awards = "${row.awards + " :credit_card:"}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          } else {
            return;
          }
       });
    });
    }

  if (message.content.startsWith("")) {
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row2 => {
      if (!row2) return;
      if (row2.levelsystem === "disabled") return;
    if (talkedRecently.has(message.author.id)) return;
    const xpgained = Math.floor(Math.random() * 15) + 1;
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
      if (!row) {
          sql.run("INSERT INTO profiles (guildId, userId, xp, level, bank, cash, awards, rep, username, winningchance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, message.author.id, 0, 1, 0, 100, "None", 0, message.author.username, 0]);
        } else {
          let curLevel = Math.floor(0.1 * Math.sqrt(row.xp + 1));
          if (curLevel > row.level) {
            row.level = curLevel;
            if (row.level >= 300) return;
            sql.run(`UPDATE profiles SET xp = ${row.xp + xpgained}, level = ${row.level} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
          }
          if (row.xp >= 9999999) return;
          sql.run(`UPDATE profiles SET xp = ${row.xp + xpgained}, cash = ${row.cash + 10}, username = "${message.author.username}" WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        }
      }).catch(() => {
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS profiles (guildId TEXT, userId TEXT, xp INTEGER, level INTEGER, bank INTEGER, cash INTEGER, awards TEXT, rep INTEGER, username TEXT, winningchance INTEGER)").then(() => {
        sql.run("INSERT INTO profiles (guildId, userId, xp, level, bank, cash, awards, rep, username, winningchance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [message.guild.id, message.author.id, 0, 1, 0, 100, "None", 0, message.author.username, 0]);
      })
    })
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 60000);
  })
}

});

const Jena1 = ["Hé Shaman"];
client.on('message', msg => {
    if( Jena1.some(word => msg.content.includes(word)) ) {
        msg.channel.send("T'es quand même une sacrée petite coquine toi");
    }
});


// Créé une notification pour les nouveaux membres
/*bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'accueil');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Bienvenue sur le serveur, ${member} !`);
});*/

/*const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

bot.on("message", message => {
  
	const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
  } catch (err) {
    message.channel.send("La commande spécifiée est introuvable. :x:").then(console.error(err));
  }

	});*/

// PARTIE COMMANDES ET MESSAGES
bot.on('message', async message => {

  function emoji (id) {
    return client.emojis.get(id).toString();
}



    // Exit and stop if it's not there
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;


//Constantes, variables et compagnie








});

client.login(require("./assets/jsons/settings.json").token);
bot.login(settings.token) //Token du bot
