const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "level-leaderboard",
    category: "level",
    description: "Check top 10 users with the most xp and the highest level",
    options: [
        {
            name: 'page',
            description: 'Page to display',
            type: 3,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const currentPage = parseInt(interaction.options.getString('page')) || 1;
        const top10 = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP DESC;").all(interaction.guild.id);
        const itemsPerPage = 10;
        const pages = Math.ceil(top10.length / itemsPerPage);

        if (currentPage < 1 || currentPage > pages) {
            return interaction.editReply(`Invalid page number! There are only ${pages} pages.`);
        }

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const usersToShow = top10.slice(startIdx, endIdx);

        const embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name} Ranking`)
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(`Top 10 Leaderboard`);

        if (usersToShow.length < 1) {
            embed.setDescription(`There are no users in the leaderboard!`);
        } else {
            usersToShow.forEach((user, index) => {
                const rank = startIdx + index + 1;
                const nextXP = user.level * 2 * 250 + 250;

                const userTag = client.users.cache.get(user.user)?.tag || `<@!${user.user}>`;

                embed.addFields({ name: `#${rank}. ${userTag}`, value: `> **Level**: \`${user.level}\`\n> **XP**: \`${user.xp} / ${nextXP}\`` });
            });

            embed.setFooter(`Page ${currentPage} / ${pages}`);

            const previousButton = new MessageButton()
                .setCustomId('previous')
                .setLabel('Previous')
                .setStyle('PRIMARY')
                .setDisabled(currentPage === 1);

            const nextButton = new MessageButton()
                .setCustomId('next')
                .setLabel('Next')
                .setStyle('PRIMARY')
                .setDisabled(currentPage === pages);

            const row = new MessageActionRow()
                .addComponents(previousButton, nextButton);

                return interaction.editReply({ embeds: [embed], components: [row], fetchReply: true })
                .then(reply => {
                    const collector = reply.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

                    collector.on('collect', async (button) => {
                        if (button.customId === 'previous') {
                            currentPage > 1 && await button.deferUpdate();
                            await handlePageChange(client, interaction, currentPage - 1);
                        } else if (button.customId === 'next') {
                            currentPage < pages && await button.deferUpdate();
                            await handlePageChange(client, interaction, currentPage + 1);
                        }
                    });

                    collector.on('end', () => {
                        row.components.forEach(component => component.setDisabled(true));
                        reply.edit({ embeds: [embed], components: [row] });
                    });
                })
                .catch(console.error);
        }
    }
};

async function handlePageChange(client, interaction, newPage) {
    const command = client.commands.get('rankleaderboard');
    if (command) {
        await command.run(client, interaction, newPage);
    }
}
