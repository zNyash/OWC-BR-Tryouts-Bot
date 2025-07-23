import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { Logger } from "./utils/Logger";
import { CommandsManager } from "./Discord/CommandsManager";

config();

export class Main {
	public static readonly DiscordClient = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	public static async Initialize() {
		Logger.Info("Inicializando a bomba...");

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
