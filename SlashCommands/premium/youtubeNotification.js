const { Client, CommandInteraction } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "youtube-notification",
  description: "🎫 | Setup YouTube notifications",
  userPermissions: ['MANAGE_ROLES'],
  options: [
    {
      name: "channelid",
      description: "Your channel ID",
      type: "STRING",
      required: true
    },
    {
      name: "channel",
      description: "Discord channel where notifications will be sent",
      type: "CHANNEL",
      required: false
    },
    {
      name: "description",
      description: "Description of the notification message",
      type: "STRING",
      required: false
    },
  ],

  run: async (client, interaction) => {
    const channelID = interaction.options.getString("channelid");
    const description = interaction.options.getString("description") || null;
    const channel = interaction.options.getChannel("channel") || null;

    // Store the configuration in the database
    db.set(`youtubeNotification_${interaction.guildId}`, {
      channelID,
      description,
      notificationChannel: channel ? channel.id : null,
    });

    interaction.reply("YouTube notifications have been set up!");
  },
};
