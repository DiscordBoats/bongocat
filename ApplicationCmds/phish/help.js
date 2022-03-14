const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "A help command, what else",
    options: [],
    category: "phish",
    run: async(interaction, client) => {
        return interaction.reply({content: "this is a placeholder slash command because yes", ephemeral: true})
    }
}
