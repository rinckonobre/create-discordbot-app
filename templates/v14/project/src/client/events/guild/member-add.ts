import { Event } from "@app/base/Events";
import { ChannelType, EmbedBuilder } from "discord.js";

export default new Event({
    name: "guildMemberAdd",
    run(member) {
        const { guild } = member;
        const home = guild.channels.cache.filter(c => c.type == ChannelType.GuildText).first();
        if (home?.type !== ChannelType.GuildText) return;

        home.send({embeds: [
            new EmbedBuilder({
                title: "Welcome ❤️",
                description: `${member} joined`,
                color: 41177113
            })
        ]})
    },
})