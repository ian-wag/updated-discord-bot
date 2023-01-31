const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          `Command: ${command.data.name} has passed through the handler`
        );
      }
    }
    const clientId = "804904034397061131";
    const guildId = "513889167822946315";
    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    try {
      console.log("Started refreshing application (/) commands.");
      // applicationGuildCommands is for making commands only work for specific guild
      // as opposed to any server the bot is in.
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
