const {  client, Message, CommandInteraction, MessageActionRow, MessageButton,MessageSelectMenu, MessageEmbed } = require("discord.js");
 

module.exports = {
  name: 'shop',
  description: 'View shop background profile',
  category: 'Info',
  aliases: ['mc'],
  run: async (client, interaction, args) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Select a background')
          .addOptions([
            // Add your select menu options here
          ]),
      );

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: "SELECT_MENU",
    });

    collector.on("collect", async (collected) => {
      const value = collected.values[0];

      // Handle the select menu interaction based on the selected value
      if (value === "0") {
        collected.update({
          files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061754498193817742/file_erdhdhRecovered.png"],
          components: [row, row2ss],
        });
      }
      collector.on("collect", async (collected) =>{
        const value = collected.values[0]
        if(value === "0" ){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061754498193817742/file_erdhdhRecovered.png"],components: [row,row2ss]})
        }
        if(value === "1" ){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1075092168001204364/qfzsfsgz.png"],components: [row,row2]})
          }
          if(value === "2" ){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1075093254946697286/zdzfdeqsdzsf.png"],components: [row,row3]})
          }
        if(value === "3"){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061743095651246100/ezsfzsfgs.png"],components: [row,row4]})
        }
        if(value === "4" ){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061743096062296214/file_3-ssssssssssssssssRecovered.png"],components: [row,row5]})
        }
        if(value === "5" ){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061743094959194153/file_3-Reczefsovered-Recovered.png"],components: [row,row6]})
        }
        if(value === "6"){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061743094183235724/file_3-Recoversszaaaed-Recovered.png"],components: [row,row7]})
        }
        if(value === "7"){
        collected.update({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1061755240782774283/qfefezs.png"],components: [row,row8]})
        }
          if(value === "8"){
        collected.update({files: ["https://cdn.discordapp.com/attachments/952622007604899883/1059545805813448795/sfzsgfzse.png"],components: [row,row9]})
        }
            if(value === "9"){
        collected.update({files: ["https://cdn.discordapp.com/attachments/952622007604899883/1059595618798014514/sdfgffffffdg.png"],components: [row,row10]})
        }
          
          
         })

    });

  }
};
