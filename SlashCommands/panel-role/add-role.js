const { Client, CommandInteraction } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "add-role",
  description: "🎫 | Add role to another user",
  userPermissions: ['MANAGE_ROLES'],
  options: [
    {
      name: "role",
      description: "role to be assigned",
      type: "ROLE",
      required: true
    },
    {
      name: "description",
      description: "description of this role",
      type: "STRING",
      required: false
    },
    {
      name: "emoji",
      description: "description of this role",
      type: "STRING",
      required: false
    }
  ],

  run: async (client, interaction) => {
    const role = interaction.options.getRole("role");
    const roleDescription = interaction.options.getString("description") || null;
    const roleEmoji = interaction.options.getString("emoji") || null;

    if (role.position >= interaction.guild.me.roles.highest.position) {
      return interaction.followUp("I can't assign a role that is higher or equal to me");
    }

    const guildData = db.get(`reactionRoles.${interaction.guildId}`) || { roles: [] };

    const newRole = {
      roleId: role.id,
      roleDescription,
      roleEmoji,
    };

    const existingRoleIndex = guildData.roles.findIndex((x) => x.roleId === role.id);

    if (existingRoleIndex !== -1) {
      guildData.roles[existingRoleIndex] = newRole;
    } else {
      guildData.roles.push(newRole);
    }

    db.set(`reactionRoles.${interaction.guildId}`, guildData);

    interaction.followUp(`Created a new role: ${role.name}`);
  } 
};
