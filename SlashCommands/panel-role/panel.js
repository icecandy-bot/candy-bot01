const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const db = require('quick.db');
const config = require('../../settings/config.json');


module.exports = {
  name: "panel",
  description: "💎 | reaction role panel",
  userPermissions: ['MANAGE_ROLES'],

  run: async (client, interaction) => {
    const guildData = db.get(`reactionRoles.${interaction.guildId}`);

    if (!guildData?.roles) {
      return interaction.followUp("There are no roles inside of this server!");
    }

    const options = guildData.roles.map(x => {
      const role = interaction.guild.roles.cache.get(x.roleId);

      return {
        label: role.name,
        value: role.id,
        description: x.roleDescription || 'NO description',
        emoji: x.roleEmoji
      };
    });

    const panelEmbed = new MessageEmbed()
      .setTitle('__**Reaction Roles**__')
      .setThumbnail("https://i.imgur.com/ZFH5OtF.png")
      .setDescription('**Please select a role below**\nThese roles will give you access to the server and announcement pings')
      .setTimestamp();

    const components = [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
           .setCustomId('reaction-roles') // <== DO NOT REMOVE THIS
           .setMaxValues(1)
           .addOptions(options)
      )
    ];

    interaction.followUp({ embeds: [ panelEmbed], components });
  }
};
