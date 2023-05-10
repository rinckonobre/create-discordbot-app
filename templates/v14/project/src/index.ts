import { ClientBuilder } from "@app/base/ClientBuilder";
import config from "@settings/config.json";
export * from "colors";

const client = new ClientBuilder();
client.start();

export { client, config };