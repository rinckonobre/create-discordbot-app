import { Command } from "@app/base/Command";
import { config } from "@src/index";
import { ApplicationCommandType, ColorResolvable, EmbedBuilder } from "discord.js";

export default new Command({
    name: "Manage",
    type: ApplicationCommandType.User,
    async run(interaction) {
        if (!interaction.inCachedGuild()) return;
        const { member } = interaction;

        const embed = new EmbedBuilder({
            author: { 
                name: member.displayName, 
                iconURL: member.displayAvatarURL({extension: "png"}) 
            }
        });

        if (member.permissions.has("Administrator")){
            embed.setColor(config.colors.success as ColorResolvable)
            .setDescription("you are an admin")
        } else {
            embed.setColor(config.colors.danger as ColorResolvable)
            .setDescription("You are not an admin")
        }

        interaction.reply({embeds: [embed]});
    },
})