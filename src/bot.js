require("dotenv").config;
const { DISCORD_TOKEN } = process.env;
import { Client, Collection, GatewayIntentBits, ClientUser } from "discord.js";
import { readdirSync } from "fs";

const client = Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = readdirSync(`src/function/${folder}`).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
