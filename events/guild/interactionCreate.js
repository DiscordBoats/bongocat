const Timeout = new Set()
const { MessageEmbed, Permissions, WebhookClient} = require('discord.js');
const humanizeDuration = require("humanize-duration");
const Schema = require("../../Database/Schema/Guild");

module.exports = async(client, interaction) => {
	if (interaction.isCommand() || interaction.isContextMenu()) {
		if (!client.slash.has(interaction.commandName)) return;
		if (!interaction.guild) return interaction.reply({content: "Slash commands can only be used in a server."});
		try {
			Schema.findOne({id: interaction.guild.id}, async (err, data) => {
				if (!data) {

					const newData = new Schema({
						id: interaction.guild.id,
						name: interaction.guild.name,
						config: {
							ignore_staff: true
						}
					})
					await newData.save()
					return interaction.reply({content: "Whoops, something went wrong. Please try again."});
				}
				if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
					data.config.delete = false
					await data.save()
				}
			})
		} catch(e) {
			return
		}
		const command = client.slash.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new MessageEmbed()
						.setDescription(`You need to wait **${humanizeDuration(command.timeout, {round: true})}** to use command again`)
						.setColor('#ff0000')
					return interaction.reply({embeds: [embed], ephemeral: true})
				}
			}
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new MessageEmbed()
						.setTitle('You\'re missing permissions!')
						.setThumbnail(interaction.member.user.avatarURL({dynamic: true}))
						.setDescription(`<:3595failed:926715200172867624> You need \`${command.permissions}\` to use this command`)
						.setColor('#ff0000')
						.setTimestamp()
					return interaction.reply({embeds: [embed], ephemeral: true})
				}
			}

			command.run(interaction, client);
			Timeout.add(`${interaction.user.id}${command.name}`)
			setTimeout(() => {
				Timeout.delete(`${interaction.user.id}${command.name}`)
			}, command.timeout);
		} catch (error) {
			console.log(`[ Error ] `.red + error)
			const webhook = new WebhookClient({
				id: "941217050871877704",
				token: "Wg2_6F6jjnESXM4HcPwqtCAbZ7dbnxkDt4gI8-RxXGESp0gjpdPVkh9ZWOkhRW8HCM-Z"
			});

			await webhook.send({
				embeds: [
					new MessageEmbed().setTitle("An error occurred:").setDescription(`\`\`\`${error}\`\`\``).setColor('RED')
				]
			})
			return await interaction.reply({content: ':x: There was an error while executing this command!', ephemeral: true});
		}

	}
} 