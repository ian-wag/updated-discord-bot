const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("nice").setDescription("nice"),
  async execute(interaction) {
    await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `nice.`;

    await interaction.editReply({
      content: newMessage,
    });
  },
};
