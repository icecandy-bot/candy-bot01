
const db = require('quick.db')
const { Client, CommandInteraction, MessageActionRow, MessageButton,MessageSelectMenu, MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: 'setup-auditlog',
    description: '🔓 | setup logs',
userPermissions: ['ADMINISTRATOR'],

    run: async(client, interaction, args) => {
      
 let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
        .setLabel(`Messages Log`)
        .setCustomId(`msg`)
        .setStyle(`SECONDARY`),
        new Discord.MessageButton()
        .setLabel(`Members Log`)
        .setCustomId(`mem`)
        .setStyle(`SECONDARY`),
        new Discord.MessageButton()
        .setLabel(`Bans & Kicks Log`)
        .setCustomId(`ban`)
        .setStyle(`SECONDARY`),
        new Discord.MessageButton()
        .setLabel(`Channels Log`)
        .setCustomId(`ch`)
        .setStyle(`SECONDARY`),
        new Discord.MessageButton()
        .setLabel(`Roles Log`)
        .setCustomId(`role`)
        .setStyle(`SECONDARY`)
      )
      let embed = new Discord.MessageEmbed()
      .setAuthor({name:`${interaction.member.user.username}` , iconURL:`${interaction.member.user.displayAvatarURL()}`})
      .setTitle(`Setup Your Logs !`)
      .setDescription(`> **Choose The Log You Need And Choose The Channel For It**`)
      .setThumbnail(`${interaction.guild.iconURL()}`)
      .setTimestamp()
      .setFooter({text:`${interaction.guild.name}` , iconURL:`${interaction.guild.iconURL()}`})
      interaction.followUp({embeds:[embed] , components:[row]})
    }
}
