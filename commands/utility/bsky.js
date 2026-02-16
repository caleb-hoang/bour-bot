const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bsky')
    .setDescription('Converts a BlueSky link to embed via VixBluesky.')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to be converted')
        .setRequired(true)
    ),
  async execute(interaction) {
    const twtRegex = /^(https?:\/\/)?(www\.)?(bsky\.app)\/[a-zA-Z0-9_]+\/?([a-zA-Z0-9_]+)?\S*$/i;
    const link = interaction.options.getString('link');
    let newLink;
    if (twtRegex.test(link)) {
        newLink = link.replace('bsky.app', 'bskx.app');
        await interaction.reply(newLink);
    } else {
        await interaction.reply('Link invalid! I currently only support BlueSky links with this command.');
    }
  },
};
