const Discord = require("discord.js");
const bot = new Discord.Client();
const { exec } = require('child_process');
exports.run = async (client, message, args) => {
        if(message.author.id !== "258394351628058636") return message.channel.send("Seul le propriétaire du bot peut utiliser cette commande.")

        const code = args.join(' ');
		if (!code) return message.channel.send('Tu n\'as fourni aucune entrée, tu es débile ?');
		exec(code, (error, stdout, stderr) => {
			const input = `\`\`\`Bash\n${code}\n\`\`\``;
			if (error) {
				let output = `\`\`\`Bash\n${error}\n\`\`\``;
				const embed = new Discord.RichEmbed()
					.setTitle('Exécuter')
					.addField(':inbox_tray: Entrée', input)
					.addField(':x: Erreur', output)
					.setColor(0x7700cf)
				return message.channel.send(embed);
			} else {
				const output = stderr || stdout;
				const output2 = `\`\`\`Bash\n${output}\n\`\`\``;
				const embed = new Discord.RichEmbed()
					.setTitle('Exécuter')
					.addField(':inbox_tray: Entrée', input)
					.addField(':outbox_tray: Sortie', output2)
					.setColor(0x7700cf)
				return message.channel.send(embed);
			}
		});
}