import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";
import { Command } from "@app/base/Command";

export default new Command({
    name: "ping",
    description: "reply with pong",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply({content: "pong", components: [
            new ActionRowBuilder<ButtonBuilder>({components: [
                new ButtonBuilder({customId: "ping-button", label: "pong", style: ButtonStyle.Success})
            ]})
        ]});
    },
    buttons: {
        "ping-button":(interaction) => {
            interaction.reply({content: "ping"})
        }
    }
})