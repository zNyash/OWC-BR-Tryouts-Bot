import { SlashCommandStringOption, SlashCommandUserOption } from "discord.js";
import { SlashCommand } from "../Models/SlashCommand";
import { SchedulesRepository } from "../../Infrastructure/Repositories/SchedulesRepository";


export default new SlashCommand()
    .setName("marcar-lobby")
    .setDescription("Marcar uma horário para jogar as tryouts")
    .addOptions(
        new SlashCommandStringOption()
            .setName("dia")
            .setDescription("Dia da lobby, no formato dd/mm/aaaa, ex.: 09/08/2025")
            .setRequired(true),

        new SlashCommandStringOption()
            .setName("hora")
            .setDescription("Horário da lobby, no formato HH:mm, ex.: 17:30")
            .setRequired(true)
    )
    .setEphemeral(true)
    .setExecutable(async (e) => {
        let user: string = e.user.displayName;
        let dateOfLobby: string = e.options.getString("dia")!;
        let timeOfLobby = e.options.getString("hora");
        
        let [day, month, year] = dateOfLobby?.split("/");
        let formattedDate = `${year}-${month}-${day}T${timeOfLobby}`;
        let timestamp = new Date(formattedDate);

        let result = await SchedulesRepository.Create(user, timestamp.getTime());

        await e.editReply(`${user} marcou um lobby: **${dateOfLobby}** às **${timeOfLobby}**`);
    });
