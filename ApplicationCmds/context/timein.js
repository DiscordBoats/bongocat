const {Permissions} = require('discord.js')
module.exports = {
    name: "remove-timeout",
    permissions: "MODERATE_MEMBERS",
    type: 3,
    run: async(interaction, client) => {
        try {


            const message = interaction.options.getMessage('message');
            if(!message.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({content: 'I need `MODERATE_MEMBERS` to timeout users.', ephemeral: true})
            if(message.author.id === interaction.member.id) return interaction.reply({content: "You can't time in yourself.", ephemeral: true})
            await message.member.disableCommunicationUntil(null, `Timeout removed by ${interaction.member.user.tag}`).catch(e => {
                return interaction.reply(`Looks like there was an issue with removing the timeout.`, {ephemeral: true})
            })
            interaction.reply({content: `${message.author.username}'s timeout has been removed.`, ephemeral: true})
        } catch (e) {
            console.log(e)
            return interaction.reply({content: `Looks like something odd happened when attempting to remove the timeout.`, ephemeral: true})
        }
    }
}