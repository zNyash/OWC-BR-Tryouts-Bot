import { ChatInputCommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { SlashCommand } from "./Models/SlashCommand";
import { Logger } from "../utils/Logger";
import { Main } from "..";

export class CommandsManager {
	private static rawCommands: SlashCommand[] = [];

	public static async InitializeCommands() {
		Logger.Info("Initializing commands...");
		await CommandsManager.LoadCommands();
		await CommandsManager.UploadCommands();
	}

	private static async LoadCommands() {
		const commandFiles = readdirSync(path.resolve(__dirname + "/../Discord/Commands"));

		for (const filename of commandFiles) {
			const file = (await import(
				path.join(path.resolve(__dirname + "/../Discord/Commands"), filename)
			)) as { default: SlashCommand };

			if (!CommandsManager.rawCommands.find((c) => c.name == file.default.name))
				CommandsManager.rawCommands.push(file.default);
		}

		Logger.Success(`Loaded ${CommandsManager.rawCommands.length} commands!`);

		return;
	}

	private static async UploadCommands() {
		const APICommands = CommandsManager.rawCommands.map((c) => c.toJSON());

		if (!Main.DiscordClient.application)
			return Logger.Error("Need an application to load commands");

		await Main.DiscordClient.application.commands.set(APICommands);

		Logger.Success(`Uploaded ${APICommands.length} commands!`);

		return;
	}

	public static async HandleCommandInteraction(commandInteraction: ChatInputCommandInteraction) {
		const commandName = commandInteraction.commandName;
		const commandGroup = commandInteraction.options.getSubcommandGroup(false);
		const commandSubcommand = commandInteraction.options.getSubcommand(false);

		if (commandName && !commandGroup && !commandSubcommand) {
			CommandsManager.ExecuteCommand(commandName, commandInteraction);
		}
	}

	private static async ExecuteCommand(
		commandName: string,
		commandInteraction: ChatInputCommandInteraction,
	) {
		Logger.Info(`Executing command ${commandName}`);
		const targetCommand = CommandsManager.rawCommands.find((c) => c.name == commandName);

		if (!targetCommand) return; /// ? Is CommandsManager possible??

		if (!targetCommand.hasModal) {
			await commandInteraction.deferReply({
				ephemeral: targetCommand.isEphemeral,
			});
		}

		targetCommand.execute(commandInteraction);
		Logger.Info(`Ran command ${commandName}`);
	}
}
