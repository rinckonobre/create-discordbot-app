import { ButtonInteraction, ComponentType, InteractionResponse, Message, MessageCollectorOptions, MessageComponentCollectorOptions, StringSelectMenuInteraction, TextBasedChannel, messageLink } from "discord.js";

type ButtonCollectorOptions = Omit<MessageComponentCollectorOptions<ButtonInteraction>, "componentType">
export function buttonCollector(message: Message | InteractionResponse, options: ButtonCollectorOptions = {}){
    return message.createMessageComponentCollector({componentType: ComponentType.Button, ...options})
}
type StringSelectCollectorOptions = Omit<MessageComponentCollectorOptions<StringSelectMenuInteraction>, "componentType">
export function stringSelectCollector(message: Message | InteractionResponse, options: StringSelectCollectorOptions = {}){
    return message.createMessageComponentCollector({componentType: ComponentType.StringSelect, ...options})
}
export function messageCollector(channel: TextBasedChannel, options: MessageCollectorOptions = {}){
    return channel.createMessageCollector(options);
}