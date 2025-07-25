import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { Logger } from "./utils/Logger";
import { CommandsManager } from "./Discord/CommandsManager";
import { DatabaseRepository } from "./Repositories/DatabaseRepository";

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
	public static readonly DiscordClient = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	public static async Initialize() {
		Logger.Info("Inicializando a bomba...");
		
		DatabaseRepository.GetConnection();
		await Main.DiscordClient.login(process.env.DISCORD_APP_TOKEN);
		await CommandsManager.InitializeCommands();

		Main.DiscordClient.on("interactionCreate", (interaction) => {
			if (interaction.isChatInputCommand()) {
				CommandsManager.HandleCommandInteraction(interaction);
			}
		});

		Logger.Success("ligo");
	}
}

Main.Initialize();
