const db = require('quick.db');
const { MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');
const schedule = require('node-schedule');

// Function to convert time expressions like "7d", "3h", "30m" to seconds
function parseDuration(durationString) {
  const duration = parseInt(durationString);
  if (isNaN(duration)) return null;

  if (durationString.endsWith('d')) return duration * 24 * 60 * 60; // Days to seconds
  if (durationString.endsWith('h')) return duration * 60 * 60;      // Hours to seconds
  if (durationString.endsWith('m')) return duration * 60;           // Minutes to seconds
  if (durationString.endsWith('s')) return duration;                // Seconds

  return null;
}

module.exports = {
  name: "addrole-time",
  description: "returns websocket ping",
  type: 'CHAT_INPUT',
  userPermissions: ['ADMINISTRATOR'],
  options: [
    {
      name: "user",
      description: "What bug are u reporting?",
      type: "USER",
      required: true,
    },
    {
      name: "role",
      description: "What bug are u reporting?",
      type: "ROLE",
      required: true,
    },
    {
      name: "duration",
      description: "The duration for the tempban. Use expressions like '7d', '3h', '30m', '60s'",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');
    const durationString = interaction.options.getString('duration');

    if (!user) return interaction.followUp('User Not Found.');
    if (!role) return interaction.followUp('Role Not Found.');

    const finalUser = user.user.id;
    const finalRole = role.id;

    const durationInSeconds = parseDuration(durationString);
    if (durationInSeconds === null) {
      return interaction.followUp('Invalid duration format. Use expressions like "7d", "3h", "30m", "60s"');
    }

    const Duration = Date.now() + durationInSeconds * 1000;

    await user.roles.add(finalRole);
    await db.set(`TempRole_${interaction.guild.id}_${finalUser}`, { duration: Duration, role: finalRole });

    const response = new MessageEmbed()
      .setTitle("✅ | __**Succesfully Role Add**__")
      .setColor("RANDOM")
      .setThumbnail(user.user.avatarURL({ dynamic: true })) 
      .setDescription(`${role} was added to <@${user.user.id}> Successfully for <t:${Math.round(Duration / 1000)}:R>`);

    interaction.followUp({ embeds: [response] });
  },
};
