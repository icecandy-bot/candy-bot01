const client = require("../../index") 
const db = require('quick.db')
const { MessageActionRow, MessageButton,MessageSelectMenu, MessageEmbed } = require("discord.js")

const background = {
  background1: "https://cdn.discordapp.com/attachments/1057730209056559174/1075092168001204364/qfzsfsgz.png",
  background2: "https://cdn.discordapp.com/attachments/1057730209056559174/1075093254946697286/zdzfdeqsdzsf.png",
  background3: "https://cdn.discordapp.com/attachments/1057730209056559174/1061754498193817742/file_erdhdhRecovered.png",
    background4: "https://cdn.discordapp.com/attachments/1057730209056559174/1061743095651246100/ezsfzsfgs.png",
   background5: "https://cdn.discordapp.com/attachments/1057730209056559174/1061743096062296214/file_3-ssssssssssssssssRecovered.png",
   background6: "https://cdn.discordapp.com/attachments/1057730209056559174/1061743094959194153/file_3-Reczefsovered-Recovered.png",
   background7: "https://cdn.discordapp.com/attachments/1057730209056559174/1061743094183235724/file_3-Recoversszaaaed-Recovered.png",
  background8: "https://cdn.discordapp.com/attachments/1057730209056559174/1061755240782774283/qfefezs.png",
    background9: "https://cdn.discordapp.com/attachments/952622007604899883/1059545805813448795/sfzsgfzse.png",
   background10: "https://cdn.discordapp.com/attachments/952622007604899883/1059595618798014514/sdfgffffffdg.png",
};
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "222ss") {
const row = new MessageActionRow() 
  .addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('select background')

					.addOptions([
            {
							label: 'background 1 (25.000) coins',
							value: '0',
						},
						{
							label: 'background 2 (40.000) coins',
							value: '1',
						},		
            {
							label: 'background 3 (60.000) coins',
							value: '2',
						},
{
							label: 'background 4 (80.000) coins',
							value: '3',
						},
            {
							label: 'background 5 (100.000) coins',
							value: '4',
						},
{
							label: 'background 6 (50.000) coins',
							value: '5',
						},
{
							label: 'background 7 (10.000) coins',
							value: '6',
						},
            {
							label: 'background 8 (70.000) coins',
							value: '7',
						},
             {
							label: 'background 9 (100.000) coins',
							value: '8',
						},
                         {
							label: 'background 10 (200.000) coins',
							value: '9',
						},
					]),
			);
  const row2ss = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('25.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('YESs'),
   )
  const row2 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('40.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('2ss'),
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
                 const row9 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('100.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('9ss'),
   )
                         const row10 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel('200.000')
        .setEmoji(`1039327980146671616`)
        .setCustomId('10ss'),
   )
  let sendmsg = interaction.reply({files: ["https://cdn.discordapp.com/attachments/1057730209056559174/1062061860335136899/ertgyeytgeyh.png"],components: [row], ephemeral: true})


    const collector = interaction.channel.createMessageComponentCollector({

    componentType: "BUTTON",
    componentType: "SELECT_MENU",
      
 });

       
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
    client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "YESs") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 25,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 25000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background3)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase \`⏣ 25,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 25000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})
/////////////////////////////////////////////////////
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "2ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 40,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 40000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background1)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase \`⏣ 40,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 40000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})
/////////////////////////////////////////////////////
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "3ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 60,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 60000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background2)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 60,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 60000)
            interaction.reply({ embeds: [Embed2]})
    }
})

client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "3ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 60,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 60000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background2)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 60,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 60000)
            interaction.reply({ embeds: [Embed2]})
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "4ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 80,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 80000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background4)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 80,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 80000)
            interaction.reply({ embeds: [Embed2]})
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "5ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 100,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 100000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background5)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 100,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 100000)
            interaction.reply({ embeds: [Embed2]})
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "6ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 50,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 50000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background6)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 50,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 50000)
            interaction.reply({ embeds: [Embed2]})
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "7ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 10,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 10000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background7)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 10,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 10000)
            interaction.reply({ embeds: [Embed2]})
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "8ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 70,000\` <:bes_coin:1039327980146671616> **`);
            if (bal < 70000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background8)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase  \`⏣ 70,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 70000)
            interaction.reply({ embeds: [Embed2]})
    }
})

client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "9ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 100,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 100000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background9)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase \`⏣ 100,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 100000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "10ss") {
         let user = interaction.member;

  let bal = db.fetch(`money_${user.id}`)
        let Embed = new MessageEmbed()       
            .setDescription(`**You need \`⏣ 200,000 \` <:bes_coin:1039327980146671616> **`);
            if (bal < 200000) return interaction.reply({ embeds: [Embed], ephemeral: true })

            db.set(`bg_${user.id}`,background.background10)
            let Embed2 = new MessageEmbed()
                .setDescription(`**Successful background purchase \`⏣ 200,000 \`<:bes_coin:1039327980146671616>**`)
                .setTimestamp();
            db.subtract(`money_${user.id}`, 200000)
            interaction.reply({ embeds: [Embed2], ephemeral: true })
    }
})


  }
})