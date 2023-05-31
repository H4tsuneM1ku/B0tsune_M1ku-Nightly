const Discord = require("discord.js"),
		arraySort = require("array-sort"),
		table = require("table"),
		send = require("quick.hook");

exports.run = async (client, message, args, tools) => {

	let invites = await message.guild.fetchInvites().catch(error => {
		return message.channel.send('Quelque chose s\'est mal passé. Je ne dois pas avoir la permission pour voir les invitations.');
	})

	invites = invites.array();

	arraySort(invites, 'uses', { reverse: true});

	let possibleInvites = [['User', 'Uses']];
	invites.forEach(function(invite) {
		possibleInvites.push([invite.inviter.username, invite.uses]);
	})

	const embed = new Discord.RichEmbed()
		.setColor(0xCB5A5E)
		.addField('Classement des invitations', `\`\`\`${table.table(possibleInvites)}\`\`\``);

	message.channel.send(embed);
}