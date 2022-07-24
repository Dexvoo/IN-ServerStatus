require('dotenv').config();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { FooterText, FooterImage, ThumnailImage, EmbedColour, DonationWebsite, FiveMChannelID, FiveMMessageID, FiveMServerID, FiveMEmbedUpdateTime } = process.env
const cfx = require('cfx-api');
module.exports = {
    name: 'ready',
    once: false,
    async execute(client)
    {
        const liveServerStatus = async () =>
        {
            var liveStatus = await cfx.fetchStatus()
            var liveServer = await cfx.fetchServer(FiveMServerID)
            if (FiveMChannelID !== '')
            {
                const liveChannelName = client.channels.cache.find(channel => channel.id == (FiveMChannelID))
                if (FiveMMessageID !== '') 
                {

                
                    if (liveServer !== undefined)
                    {
                        liveChannelName.messages.fetch(FiveMMessageID).then((message) =>
                        {
                            const liveStatusMessage = new EmbedBuilder()
                                .setThumbnail(ThumnailImage)
                                .setColor(EmbedColour)
                                .addFields(
                                    { name: '• Server Status •', value: 'Online ✅', inline: true },
                                    { name: '• CFX Status •', value: liveStatus.everythingOk ? "Online ✅" : "Issues ⚠️", inline: true },
                                    { name: '• Conected Players •', value: `${liveServer.playersCount} / ${liveServer.maxPlayers}`, inline: true },
                                )
                                .setFooter({ text: '• Last update: ', iconURL: FooterImage })
                                .setTimestamp()

                            const livePlayerNames = []
                            for (var player in liveServer.players)
                            {
                                livePlayerNames.push(`ID: ${liveServer.players[player].id} | ${liveServer.players[player].name}\n`)
                            }

                            for (let i = 0; i < livePlayerNames.length; i += 10)
                            {
                                liveStatusMessage.addFields({ name: 'Player Information', value: `${livePlayerNames.sort().slice(i, i + 10).join('')}`, inline: true },)
                            }
                            message.edit({ embeds: [liveStatusMessage] });
                        })
                        client.user?.setActivity(`Players: ${liveServer.playersCount}/${liveServer.maxPlayers}`, { type: 'WATCHING' });
                    }
                    else
                    {
                        liveChannelName.messages.fetch(FiveMMessageID).then((message) =>
                        {
                            const liveStatusMessage = new EmbedBuilder()
                                .setThumbnail('https://imgur.com/0KIFmOl.gif')
                                .setColor('#a082ff')
                                .addFields(
                                    { name: '• Server Status •', value: 'Offline ❌', inline: true },
                                    { name: '• Conected Players •', value: `0/0`, inline: true },
                                    { name: '• Restart Time •', value: `3PM BST (London)`, inline: true },
                                    { name: 'Player Information', value: `None to Display`, inline: false },
                                )
                                .setFooter({ text: '• Last update: ', iconURL: FooterImage })
                                .setTimestamp()
                            message.edit({ embeds: [liveStatusMessage] });
                        })
                    }
                    setTimeout(liveServerStatus, 1000 * parseInt(FiveMEmbedUpdateTime, 10))
                } else 
                {
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
                    await liveChannelName.send({embeds: [exampleEmbed], components: [Button]})
                }
            }
            else
            {
                console.log('Please fill in the .env file, you need to define : FiveMChannelID')
                return
            }
        }
        liveServerStatus()
    }
}