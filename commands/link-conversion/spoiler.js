const { SlashCommandBuilder } = require('discord.js');
const regexData = require('./regex.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spoil-embed')
    .setDescription('Converts a social media link to an embed-friendly URL, marking it as a spoiler.')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to convert')
        .setRequired(true)
    ),
  async execute(interaction) {
    const link = interaction.options.getString('link');
    let convertedLink = null;

    for (const site of regexData) {
      const regex = new RegExp(site.regex, 'i');
      if (regex.test(link)) {
        let result = link;
        for (let i = 0; i < site.target.length; i++) {
          result = result.replace(site.target[i], site.replacement[i]);
        }
        convertedLink = result;
        break;
      }
    }

    if (convertedLink) {
      await interaction.reply("||" + convertedLink + "||");
    } else {
      await interaction.reply({
        content: 'Link invalid! I currently only support Twitter/X, Bluesky, Instagram, YouTube Shorts, and Reddit links.',
      });
    }
  },
};
