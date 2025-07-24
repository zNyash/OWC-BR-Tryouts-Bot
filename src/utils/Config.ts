import { config as dotenvConfig } from "dotenv";
import { Logger } from "./Logger";
dotenvConfig();

const requiredEnvironmentVariables = [
    "DISCORD_CLIENT_ID",
    "DISCORD_APP_TOKEN",
    "BANCHO_IRC_USERNAME",
    "BANCHO_IRC_PASSWORD",
];

const missingVariables = requiredEnvironmentVariables.filter((envVar) => !process.env[envVar]);

if (missingVariables.length > 0) {
    Logger.Error(`Missing environment variables ${missingVariables.join(", ")}`);
    process.exit(1);
}

export const config = {
    discord: {
        token: process.env.DISCORD_APP_TOKEN,
        clientId: process.env.DISCORD_CLIENT_ID,
    },
    bancho: {
        username: process.env.BANCHO_IRC_USERNAME,
        password: process.env.BANCHO_IRC_PASSWORD,
    },
};
