const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reddit')
    .setDescription('Converts a Reddit link to embed via rxddit.')
    .addStringOption((option) =>
      option
        .setName('link')
        .setDescription('The link to be converted')
        .setRequired(true))
    .addBooleanOption((option) => 
      option
        .setName('spoiler')
        .setDescription('Marks link as a spoiler')
        .setRequired(false)
    ),
  async execute(interaction) {
    const twtRegex = /^(https?:\/\/)?(www\.)?(reddit\.com)\/[a-zA-Z0-9_]+\/?([a-zA-Z0-9_]+)?\S*$/i;
    const link = interaction.options.getString('link');
    const spoiler = interaction.options.getBoolean('spoiler') ?? false;
    let newLink;
    if (twtRegex.test(link)) {
        newLink = link.replace('reddit.com', 'rxddit.com');

        if (spoiler) {
          newLink = '||' + newLink + '||';
        }      

        await interaction.reply(newLink);
    } else {
        await interaction.reply('Link invalid! I currently only support Reddit links with this command.');
    }
  },
};
