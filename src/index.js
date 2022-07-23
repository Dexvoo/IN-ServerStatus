// Getting Classes
require('dotenv').config();
const { Token } = process.env
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Creating a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const commandsFilePath = path.join(commandsPath, file);
	const command = require(commandsFilePath);
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles)
{
	const eventsFilePath = path.join(eventsPath, file);
	const event = require(eventsFilePath);
	if (event.once)
	{
		client.once(event.name, (...args) => event.execute(...args));
	} else
	{
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction =>
{
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try
	{
		await command.execute(interaction);
	} catch (error)
	{
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Loggin in with bot
client.login(Token);