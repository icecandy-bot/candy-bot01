const { Client, CommandInteraction } = require('discord.js');
const db = require('quick.db'); // Import quick.db


module.exports = {
  name: "remove-role",
  description: "🎟️ | reaction role panel",
  userPermissions: ['MANAGE_ROLES'],
  options: [
    {
      name: "role",
      description: "role to be Removed",
      type: "ROLE",
      required: true
    },
  ],

  run: async (client, interaction) => {
    const role = interaction.options.getRole("role");

    const guildData = db.get(`reactionRoles.${interaction.guildId}`);

    if (!guildData) {
      return interaction.followUp("There are no roles inside of this server!");
    }

    const guildRoles = guildData.roles;

    const findRoleIndex = guildRoles.findIndex(x => x.roleId === role.id);

    if (findRoleIndex === -1) {
      return interaction.followUp("That role is not added to the reaction roles list");
    }

    const filteredRoles = guildRoles.filter(x => x.roleId !== role.id);
    guildData.roles = filteredRoles;

    db.set(`reactionRoles.${interaction.guildId}`, guildData);

    interaction.followUp(`Removed: ${role.name}`);
  }
};
