const client = require("../../index");
const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction } = require('discord.js')
const db = require('quick.db')

const badge = {
  badge1: "https://cdn.discordapp.com/attachments/1057730209056559174/1143320511733043260/3757-star-hunter.png",
  badge2: "https://cdn.discordapp.com/attachments/1045774828541579264/1059118384215752764/640px-Python-logo-notext.svg.png",
  background3: "https://cdn.discordapp.com/attachments/1046111039701405866/1057758369173225654/file_erdhdhRecovered.png",
    background4: "https://cdn.discordapp.com/attachments/1046111039701405866/1057809290389377064/ezsfzsfgs.png",
   background5: "https://cdn.discordapp.com/attachments/1046111039701405866/1057809290867511316/file_3-ssssssssssssssssRecovered.png",
   background6: "https://cdn.discordapp.com/attachments/1046111039701405866/1057813701614374912/file_3-Reczefsovered-Recovered.png",
   background7: "https://cdn.discordapp.com/attachments/1046111039701405866/1057814896898748496/file_3-Recoversszaaaed-Recovered.png",
  background8: "https://cdn.discordapp.com/attachments/1046111039701405866/1058027679074484264/qfefezs.png",
};


client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "b1s") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 25,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 25000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`badge_${user.id}`,badge.badge1)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful badge purchase \`⏣ 25,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 25000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})

client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "b2s") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 40,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 25000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`badge_${user.id}`,badge.badge2)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful badge purchase \`⏣ 40,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 25000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})