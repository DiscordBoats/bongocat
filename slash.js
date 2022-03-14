const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const { readdirSync } = require('fs');
const path = require('path');
require('colors');


module.exports = async () => {
	const commands = []
	readdirSync("./ApplicationCmds/"
).map(async dir => {
	readdirSync(`./ApplicationCmds/${dir}/`).map(async (cmd) => {
		commands.push(require(path.join(__dirname, `./ApplicationCmds/${dir}/${cmd}`)))
	})
})

const rest = new REST({version: "9"}).setToken(process.env.token);

	try {
		console.log(`[ Discord ]`.cyan + ' Refreshing application commands.'.yellow);
		await rest.put(Routes.applicationCommands("926687914174341130"), {body: commands},);
		console.log(`[ Discord ]`.cyan + ' Reloaded application commands.'.green);
	} catch (error) {
		console.error(error);
	}
}