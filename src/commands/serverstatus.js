const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
require('dotenv').config();
const { FooterText, FooterImage, ThumnailImage, EmbedColour, DonationWebsite, FiveMServerID } = process.env


module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstatus')
        .setDescription('Posts the starting Message.'),

    async execute(interaction)
    {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, true))
        {
            const exampleEmbed = new EmbedBuilder()
                .setColor(EmbedColour)
                .setDescription('• You do not have permissions for this command •')
                .setTimestamp()
                .setFooter({ text: FooterText, iconURL: FooterImage });
            interaction.reply({ embeds: [exampleEmbed] })
            return
        }
        const Button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Connect to Live Server')
                    .setStyle('Link')
                    .setURL(`https://cfx.re/join/${FiveMServerID}`),

                new ButtonBuilder()
                    .setLabel('Cfx.re Status')
                    .setStyle('Link')
                    .setURL('https://status.cfx.re'),

                new ButtonBuilder()
                    .setLabel('Donation Website')
                    .setStyle('Link')
                    .setURL(DonationWebsite)
            );

        const exampleEmbed = new EmbedBuilder()
            .setColor(EmbedColour)
            .setDescription('• **Server Status** •')
            .setThumbnail(ThumnailImage)
            .setTimestamp()
            .setFooter({ text: FooterText, iconURL: FooterImage });
        await interaction.reply({ embeds: [exampleEmbed], components: [Button] })
    }
}