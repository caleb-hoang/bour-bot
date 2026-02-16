const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitter')
    .setDescription('Converts a Twitter/X link to embed via fxtwitter.')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to be converted')
        .setRequired(true)
    ),
  async execute(interaction) {
    const twtRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?([a-zA-Z0-9_]+)?\S*$/i;
    const link = interaction.options.getString('link');
    let newLink;
    if (twtRegex.test(link)) {
      if (link.includes('twitter.com')) {
        newLink = link.replace('twitter.com', 'fxtwitter.com');
      } else {
        newLink = link.replace('x.com', 'fxtwitter.com');
      }
      await interaction.reply(newLink);
    } else {
      await interaction.reply('Link invalid! I currently only support Twitter/X links with this command.');
    }
  },
};
