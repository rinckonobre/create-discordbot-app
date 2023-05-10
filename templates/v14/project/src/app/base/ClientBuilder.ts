import { clear, log } from "console";
import { ApplicationCommandType, BitFieldResolvable, Client, ClientEvents, Collection, GatewayIntentsString, IntentsBitField, Partials, version } from "discord.js";
import dotenv from "dotenv";
import { existsSync, readdirSync } from "fs";
import cron from "node-cron";
import { join } from "path";
import { ButtonComponents, CommandType, ModalComponents, StringSelectComponents } from "./Command";
import { EventType } from "./Events";
import { TaskType } from "./Task";
dotenv.config();

const clientPath = join(__dirname, "../../client")
function fileFilter(fileName: string){
    return fileName.endsWith(".ts") || fileName.endsWith(".js")
}

export class ClientBuilder extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    private buttons: ButtonComponents = {}
    private stringSelects: StringSelectComponents = {}
    private modals: ModalComponents = {}
    constructor(){
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: Object.values(Partials) as Partials[],
            failIfNotExists: false,
        });
    }
    public start(){
        this.loadCommands();
        this.loadEvents();
        this.loadTasks();
        this.registerListeners();
        this.once("ready", this.whenReady);
        const token = process.env.BOT_TOKEN;
        if (!token) {
            throw new Error("Token not defined in .env file".red);
        }
        this.login(token);
    }
    private async loadCommands(){
        const commandsPath = join(clientPath, "commands");
        if (!existsSync(commandsPath)) return;

        readdirSync(commandsPath).forEach(subFolder => {
            readdirSync(join(commandsPath, subFolder)).filter(fileFilter)
            .forEach(async fileName => {

                const command: CommandType = (await import(`../../client/commands/${subFolder}/${fileName}`))?.default
                if (!command.name) return;
                const { name, buttons, stringSelects, modals } = command;

                this.commands.set(name, command);

                if (buttons) this.buttons = {...this.buttons, ...buttons}
                if (stringSelects) this.stringSelects = {...this.stringSelects, ...stringSelects}
                if (modals) this.modals = {...this.modals, ...modals}
              
            })
        })
    }
    private async loadEvents(){
        const eventsPath = join(clientPath, "events");
        if (!existsSync(eventsPath)) return;

        readdirSync(eventsPath).forEach(subFolder => {
            readdirSync(join(eventsPath, subFolder)).filter(fileFilter)
            .forEach(async fileName => {

                const event: EventType<keyof ClientEvents> = (await import(`../../client/events/${subFolder}/${fileName}`))?.default
                if (!event.name) return;

                if (event.once) this.once(event.name, event.run);
                else this.on(event.name, event.run);
            })
        })
    }
    private async loadTasks(){
        const eventsPath = join(clientPath, "tasks");
        if (!existsSync(eventsPath)) return;

        readdirSync(eventsPath).forEach(subFolder => {
            readdirSync(join(eventsPath, subFolder)).filter(fileFilter)
            .forEach(async fileName => {

                const task: TaskType = (await import(`../../client/tasks/${subFolder}/${fileName}`))?.default
                const { name, display, enable, frequency, run } = task;
                if (!name || !enable || !cron.validate(frequency)) return;
                cron.schedule(frequency, run, { name });
                log(display);
            })
        })
    }
    private registerListeners(){
        this.on("interactionCreate", (interaction) => {
            if (interaction.isCommand()){
                const command = this.commands.get(interaction.commandName);
                if (!command) return;
                const { type } = command;
                const { ChatInput, Message, User } = ApplicationCommandType;

                if (interaction.isChatInputCommand() && type == ChatInput) command.run(interaction);
                if (interaction.isUserContextMenuCommand() && type == User) command.run(interaction);
                if (interaction.isMessageContextMenuCommand() && type == Message) command.run(interaction);
                return;
            }
            if (interaction.isButton()){
                const onClick = this.buttons[interaction.customId]
                if (onClick) onClick(interaction);
                return;
            }
            if (interaction.isStringSelectMenu()){
                const onSelect = this.stringSelects[interaction.customId]
                if (onSelect) onSelect(interaction);
                return;
            }
            if (interaction.isModalSubmit()){
                const onSubmit = this.modals[interaction.customId]
                if (onSubmit) onSubmit(interaction);
                return;
            }

        })
    }
    private whenReady(){
        clear();
        log("✓ Bot online".green, "discord.js".bgBlue.white, version.yellow);

        this.application?.commands.set(this.commands.map(c => c))
        .then((commands) => log("⟨ / ⟩".cyan, `${commands.size} commands defined successfully!`.green))
        .catch((err) => log("An error occurred while trying to set the commands\n".red, err))
    }
}