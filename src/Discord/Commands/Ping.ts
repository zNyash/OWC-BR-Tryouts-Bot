import { SlashCommand } from "../Models/SlashCommand";

export default new SlashCommand()
    .setName("teste")
    .setDescription("pinto")
    .setEphemeral(true)
    .setExecutable((e) => {
        e.editReply("acerta o ferro e tora o meu anel");
    });
