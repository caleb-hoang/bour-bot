const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('instagram')
    .setDescription('Converts an Instagram link to embed via rxddit.')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to be converted')
        .setRequired(true)
    ),
  async execute(interaction) {
    const twtRegex = /^(https?:\/\/)?(www\.)?(instagram\.com)\/[a-zA-Z0-9_]+\/?([a-zA-Z0-9_]+)?\S*$/i;
    const link = interaction.options.getString('link');
    let newLink;
    if (twtRegex.test(link)) {
        newLink = link.replace('instagram.com', 'vxinstagram.com');
        await interaction.reply(newLink);
    } else {
        await interaction.reply('Link invalid! I currently only support Instagram links with this command.');
    }
  },
};
