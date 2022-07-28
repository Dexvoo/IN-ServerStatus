// Getting Classes
require('dotenv').config();
const { ClientID, GuildID, Token } = process.env
const { Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(Token);

rest.put(Routes.applicationGuildCommands(ClientID, GuildID), { body: [] })
	.then(() => console.log('Successfully deleted all global commands.'))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(ClientID, GuildID), { body: commands })
	.then(() => console.log('Successfully registered global commands.'))
	.catch(console.error);
