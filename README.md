# Create discord bot app

Create a discord bot project quickly using create-discordbot-app. The project has a handler of commands, events and components of discord.js, you can choose the version of the api you want to use.

start using:
```
npx create-discordbot-app
```

## See some examples of this project

Create a command just by exporting a class in the command directory
```ts
// src/client/commands/staff/manage.ts
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
```

Components defined directly in the command. Create a function for a discord.js component just using the customId
```ts
// src/client/commands/common/ping.ts
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
```

It is possible to create scheduled tasks to repeat continuously using node-cron and Task class
```ts
// src/client/tasks/daily/good-morning.ts
import { Task } from "@app/base/Task";

export default new Task({
    name: "good-morning",
    enable: false, // is currently disabled
    display: "Good morning message",
    // This website can help you create frequencies for node cron https://crontab.guru/
    frequency: "0 6 * * *", 
    run() {
        console.log("Good morning")
    },
})
```