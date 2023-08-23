const {  client, Message, CommandInteraction, MessageActionRow, MessageButton,MessageSelectMenu, MessageEmbed } = require("discord.js")
 const db = require('quick.db')

module.exports = {
    name: 'badgeshop',
    description: 'View shop badge profile',
    category: 'Info',
    aliases: ['mc'],
      run: async (client, interaction, args) => {
  
const row = new MessageActionRow() 
  .addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('select badge')

					.addOptions([
            {
							label: 'badge 1',
							value: '0',
						},
						{
							label: 'badge 2',
							value: '1',
						},		
            {
							label: 'badge 3',
							value: '2',
						},
{
							label: 'badge 4',
							value: '3',
						},
            {
							label: 'badge 5',
							value: '4',
						},
{
							label: 'badge 6',
							value: '5',
						},
{
							label: 'badge 7',
							value: '6',
						},
            {
							label: 'badge 8',
							value: '7',
						},
					]),
			);
  const row2ss = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('25.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('b1s'),
   )
  const row2 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('40.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('b2s'),
   )
    const row3 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('60.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('3ss'),
   )
      const row4 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('80.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('4ss'),
   )
        const row5 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('100.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('5ss'),
   )
          const row6 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('50.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('6ss'),
   )
            const row7 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('10.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('7ss'),
   )
         const row8 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('70.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('8ss'),
   )
  let sendmsg = interaction.followUp({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057791270287843368/rgdedrgg.png"],components: [row]})


    const collector = interaction.channel.createMessageComponentCollector({

    componentType: "BUTTON",
    componentType: "SELECT_MENU",
      
 });

       
collector.on("collect", async (collected) =>{
const value = collected.values[0]
if(value === "0" ){
collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1143320511733043260/3757-star-hunter.png"],components: [row,row2ss]})
}
if(value === "1" ){
collected.update({files: ["https://cdn.discordapp.com/attachments/1045774828541579264/1059118384215752764/640px-Python-logo-notext.svg.png"],components: [row,row2]})
  }
  if(value === "2" ){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057760772899475588/zdzfdezsf.png"],components: [row,row3]})
  }
if(value === "3"){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057809290389377064/ezsfzsfgs.png"],components: [row,row4]})
}
if(value === "4" ){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057809290867511316/file_3-ssssssssssssssssRecovered.png"],components: [row,row5]})
}
if(value === "5" ){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057813701614374912/file_3-Reczefsovered-Recovered.png"],components: [row,row6]})
}
if(value === "6"){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1057814896898748496/file_3-Recoversszaaaed-Recovered.png"],components: [row,row7]})
}
if(value === "7"){
collected.update({files: ["https://cdn.discordapp.com/attachments/1046111039701405866/1058027679074484264/qfefezs.png"],components: [row,row8]})
}
  
  
 })
  
  
}
  }