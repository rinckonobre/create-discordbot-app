import { Command } from "@app/base/Command";
import { random } from "@functions/code/math";
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export default new Command({
    name: "random",
    description: "random number",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "max",
            description: "max number",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: "min",
            description: "min number",
            type: ApplicationCommandOptionType.Number,
        }
    ],
    async run(interaction) {
        if (!interaction.inCachedGuild()) return;
        const { options } = interaction;
        const max = options.getNumber("max", true);
        const min = options.getNumber("min") ?? 0;

        await interaction.reply({
            embeds: [
                new EmbedBuilder({
                    title: "🎲 Random number",
                    description: `Your random number is ${random(min, max)}`,
                    fields: [
                        {name: "max", value: `${max}`, inline: true},
                        {name: "min", value: `${min}`, inline: true}
                    ]
                })
            ],
            components: [new ActionRowBuilder<ButtonBuilder>({components: [
                new ButtonBuilder({
                    customId: "random-other-button", 
                    label: "New random number", 
                    style: ButtonStyle.Success
                })
            ]})]
        });
    },
    buttons: {
        "random-other-button":(interaction) => {
            const embed = interaction.message.embeds[0];
            if (!embed || !embed.data.fields) return;
            const { fields } = embed.data;
            const [max, min] = [parseFloat(fields[0].value), parseFloat(fields[1].value)]

            interaction.update({
                embeds: [
                    new EmbedBuilder({...embed, description: `Your random number is ${random(min, max)}`})
                ],
            })
        }
    }
})