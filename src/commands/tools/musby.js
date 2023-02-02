const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("musby").setDescription("must be"),
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
