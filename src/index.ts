import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { Logger } from "./utils/Logger";

config();
// const DISCORD_TOKEN = process.env.DISCORD_APP_TOKEN;
// const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

// const commands: RESTPostAPIApplicationCommandsJSONBody[] = [
// 	{
// 		name: "carlinhos",
// 		description: "fala a verdade.",
// 	},
// ];

// async function main() {
// 	if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
// 		throw new Error(chalk.red("Missing token or client ID"));
// 	}

// 	try {
// 		await registerCommands(DISCORD_TOKEN, DISCORD_CLIENT_ID, commands);

// 		const client = new Client({
// 			intents: [GatewayIntentBits.Guilds],
// 		});

// 		client.once("ready", async (c) => {
// 			console.log(chalk.green(`${c.user.username} is online`));
// 		});

// 		client.on("interactionCreate", async (interaction) => {
// 			if (!interaction.isChatInputCommand()) return;

// 			if (interaction.commandName === "carlinhos") {
// 				await interaction.reply("é poggers");
// 			}
// 		});

// 		console.log(chalk.gray("Logging in..."));
// 		await client.login(DISCORD_TOKEN);
// 	} catch (error) {
// 		throw new Error(chalk.red(`Error iniatializing the bot: ${error}`));
// 	}
// }
// main();

export class Main {
	private static DiscordClient = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	public static Initialize() {
		Logger.Info("Inicializando a bomba...");

		Main.DiscordClient.login(process.env.DISCORD_APP_TOKEN);

		Logger.Success("ligo");
	}
}

Main.Initialize();
