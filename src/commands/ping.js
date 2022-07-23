const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with your ping latancy.'),

    async execute(interaction)
    {
        await interaction.reply(`Ping Latancy: ${Date.now() - interaction.createdTimestamp}ms`)
    }
}