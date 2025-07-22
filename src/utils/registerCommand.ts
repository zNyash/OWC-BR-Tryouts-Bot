import chalk from "chalk";
import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";

/**
 * Registers a list of commands on a Discord bot.
 *
 * @throws {Error} If either token or client ID is not provided, or if the REST request fails.
 */
export async function registerCommands(
  token: string,
  clientId: string,
  commands: RESTPostAPIApplicationCommandsJSONBody[],
): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log(chalk.gray("Registering commands..."));
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });
    console.log(chalk.green("Successfully registered commands"));
  } catch (error) {
    throw new Error(chalk.red(`Error registering commands: ${error}`));
  }
}
