const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Ask GPT3 a question")
    .addStringOption((option) =>
      option.setName("prompt").setDescription("Prompt").setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString("prompt");
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    await interaction.deferReply({
      fetchReply: true,
    });

    const answer = response.data.choices[0].text;

    await interaction.editReply({
      content: answer,
    });
  },
};
