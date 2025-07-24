import { config } from "../utils/Config";
import irc from "bancho.js";
import { Logger } from "../utils/Logger";

export class BanchoManager {
    public static readonly BanchoClient = new irc.BanchoClient({
        username: config.bancho.username!,
        password: config.bancho.password!,
    });

    public static async Connect() {
        Logger.Info("Connecting to Bancho server");

        await BanchoManager.BanchoClient.connect();

        Logger.Success("Connected to Bancho and listening to messages");
    }

    private static async HandleMessage() {}
}
