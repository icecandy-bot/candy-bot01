const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
const db = require("quick.db"); // Import the quick.db package

module.exports = {
  name: "warn",
  description: "Advanced warning system",
  userPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "add",
      description: "Add a warning to a user",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User to add a warning to",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "Reason for the warning",
          type: "STRING",
          required: false,
        },
      ],
    },
    {
      name: "check",
      description: "Check warnings of a user",
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "User to check warnings for",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove a warning",
      type: "SUB_COMMAND",
      options: [
        {
            name: "user",
            description: "User to remove a warning to",
            type: "USER",
            required: true,
          },
        {
          name: "amount",
          description: "amount of the warning to remove",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const [SubCommand] = args; // Define sub command

    if (SubCommand === "add") {
      const member = interaction.options.getMember("user");
      const reason = interaction.options.getString('reason') || 'No reason'; // Define reason

      // Permissions checking
      if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({content: 'I cannot warn this user as their highest role is higher than mine or I have the same highest role as them.', ephemeral: true});

      if (member.id === interaction.guild.ownerId) return interaction.followUp({content: 'I cannot warn the owner of the server.', ephemeral: true});

      if (member.id === interaction.user.id) return interaction.followUp({content: 'You cannot warn yourself.', ephemeral: true});

      if (member.id === interaction.guild.me.id) return interaction.followUp({content: 'I cannot warn myself.', ephemeral: true});

      if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.followUp('You don\'t have permission to use this command');

      // Buttons
      const embed1 = new MessageEmbed()
        .setDescription(`Are you sure you want to warn ${member.user.username}?`)
        .setColor('BLUE');

      const bcomponents = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('YES')
          .setLabel('Yes')
          .setStyle('SUCCESS'),

        new MessageButton()
          .setCustomId('NO')
          .setLabel('No')
          .setStyle('DANGER')
      );

      const msg = await interaction.followUp({ embeds: [embed1], components: [bcomponents], fetchReply: true });
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = msg.channel.createMessageComponentCollector({
        filter, // It's important
        time: 20000, // 20 seconds to choose buttons
      });

      // Answers
      const embed2 = new MessageEmbed()
        .setDescription(`✅ User has been warned\n\nUser: ${member.user.tag}\nModerator: ${interaction.user.tag}\nReason: \`${reason}\``)
        .setColor('GREEN');

      const embed3 = new MessageEmbed()
        .setDescription(`❌ Action was canceled by ${interaction.user.tag}`)
        .setColor('RED');

      collector.on('collect', async (i) => {
        if (i.customId === 'YES') {
          await interaction.editReply({embeds: [embed2], components: []});

          // Save the warning to quick.db
          const warnings = db.get(`warnings_${interaction.guildId}_${member.id}`) || [];
          warnings.push({
            moderatorId: interaction.member.id,
            reason,
            timestamp: Date.now(),
          });
          db.set(`warnings_${interaction.guildId}_${member.id}`, warnings);

          member.send(`You have been warned in ${interaction.guild.name} for ${reason}`);
          collector.stop('success');

        } else if (i.customId === 'NO') {
          interaction.editReply({ embeds: [embed3], components: [] });
          collector.stop('success');
        }
      });

      const embed4 = new MessageEmbed()
        .setDescription('You took too much time! Timed out')
        .setColor('RED');

      collector.on('end', async (ignore, error) => {
        if (error && error !== 'success') {
          interaction.editReply({embeds: [embed4], components: []});
        }
        collector.stop('success');
      });

    } else if (SubCommand === "check") {
      const user = interaction.options.getUser("user") || interaction.user; // Define user

      // Retrieve warnings from quick.db
      const userWarnings = db.get(`warnings_${interaction.guildId}_${user.id}`) || [];

      if (userWarnings.length === 0) {
        // User has no warnings
        const embed5 = new MessageEmbed()
          .setTitle(`${user.tag}'s warnings`)
          .setDescription(`${user.tag} has no warnings in the server`)
          .setColor("PURPLE");
        
        interaction.editReply({ embeds: [embed5], components: [] });
      } else {
        // User has warnings
        const embedDescription = userWarnings.map((warn, index) => {
          const moderator = interaction.guild.members.cache.get(warn.moderatorId) || 'Has Left';
          return [
            `Warn ${index + 1}`,
            `Moderator: ${moderator}`,
            `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
            `Reason: ${warn.reason}`
          ].join('\n');
        }).join('\n\n');

        const embed6 = new MessageEmbed()
          .setTitle(`${user.tag}'s warnings`)
          .setDescription(embedDescription)
          .setColor('GREEN');

        interaction.editReply({ embeds: [embed6], components: [] });
      }

    } else if (SubCommand === "remove") {
        const warnId = interaction.options.getString("amount");
      
        // Define the user based on the interaction options
        const user = interaction.options.getMember("user");
      
        if (!user) {
          const error1 = new MessageEmbed()
            .setTitle("Error")
            .setDescription("The specified user is not valid.")
            .setColor("RED");
      
          interaction.followUp({
            embeds: [error1]
          });
          return;
        }
      
        // Check if the warning ID exists in quick.db
        const userWarnings = db.get(`warnings_${interaction.guildId}_${user.id}`) || [];
        
        // Convert warnId to an integer
        const warnIndex = parseInt(warnId) - 1;
      
        if (isNaN(warnIndex) || warnIndex < 0 || warnIndex >= userWarnings.length) {
          const error2 = new MessageEmbed()
            .setTitle("Error")
            .setDescription("The warn ID you have provided is invalid")
            .addField(`Warn ID:`, `${warnId}`)
            .setColor("RED");
      
          interaction.followUp({
            embeds: [error2]
          });
          return;
        }
      
        // Remove the warning with the specified index
        userWarnings.splice(warnIndex, 1);
        db.set(`warnings_${interaction.guildId}_${user.id}`, userWarnings);
      
        // Send a success message
        const embed7 = new MessageEmbed()
          .setDescription(`✅ Warning ${warnId} has been removed for ${user.user.tag}`)
          .setColor('GREEN');
      
        interaction.followUp({ embeds: [embed7] });
      }
   
    }  
};