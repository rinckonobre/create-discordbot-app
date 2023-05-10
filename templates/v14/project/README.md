# v14 Discord Bot Base
Create a powerful bot using this template. It has a handler for commands, events, tasks and components. You can change the base codes as you like, adding features to the database or removing something you don't want.

The "dev" script is used in the development environment.
```ts
npm run dev
```
you can build the project using the build script.
```ts
npm run build
```

to start the bot with the compiled project use the start script
```ts
npm start
```

Set your token obtained from the [discord developers portal](https://discord.com/developers/applications) in .env

## Features

This template has some differences from the others, you can define permanent functions for components directly in the creation of a command

```ts
// src/client/commands/common/ping.ts
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
        "ping-button": (interaction) => {
            interaction.reply({content: "ping"})
        }
    }
})
```
In your command's code you can create a button and in the command's buttons property you can add functions as properties of an object. The property key is the customId of the button and the value is the function it will perform
_Remember this is a permanent component, so check accordingly and use it only when necessary_

Works the same for modal and string select menus.

**All folders have examples of what they are for, explore and use as you wish**