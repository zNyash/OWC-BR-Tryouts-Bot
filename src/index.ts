import { config } from "./utils/Config";
import { Client, GatewayIntentBits } from "discord.js";
import { Logger } from "./utils/Logger";
import { CommandsManager } from "./Discord/CommandsManager";
import { BanchoManager } from "./Bancho/BanchoClient";

export class Main {
    public static readonly DiscordClient = new Client({
        intents: [GatewayIntentBits.Guilds],
    });

    public static async Initialize() {
        Logger.Info("Starting...");

        await Main.DiscordClient.login(config.discord.token);
        await CommandsManager.InitializeCommands();
        await BanchoManager.Connect();

        Main.DiscordClient.on("interactionCreate", (interaction) => {
            if (interaction.isChatInputCommand()) {
                CommandsManager.HandleCommandInteraction(interaction);
            }
        });

        Logger.Success("Bot started!");
    }
}

try {
    Main.Initialize();
} catch (error) {
    Logger.Error("Failed to start bot.", error);
}
