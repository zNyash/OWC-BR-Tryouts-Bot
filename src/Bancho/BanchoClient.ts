import irc from "bancho.js";
import { Logger } from "../utils/Logger";

export class BanchoManager {
	public static readonly BanchoClient = new irc.BanchoClient({
		username: process.env.BANCHO_IRC_USERNAME!,
		password: process.env.BANCHO_IRC_PASSWORD!,
	});

	public static async Connect() {
		Logger.Info("Connecting to Bancho server");

		BanchoManager.BanchoClient.connect();

		Logger.Success("Connected to Bancho and listening to messages");
	}
}
