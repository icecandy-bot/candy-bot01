const db = require("quick.db");
const Discord = require("discord.js");
const {  client, Message, CommandInteraction, MessageActionRow, MessageButton,MessageSelectMenu, MessageEmbed } = require("discord.js")
const ms = require('ms');

module.exports = {
    name: 'daily',
    description: 'daily reword',
    category: 'economy',
    aliases: ['mc'],

  
    run: async (client, interaction, args) => {
     const user = interaction.member;
    let row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji(`1046795009179000843`)
        .setCustomId('YES'),
    );
    let bbb = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("SUCCESS")
        .setEmoji(`1046795009179000843`)
       .setDisabled(true)
        .setCustomId('YES'),
    );

    const check = await db.fetch(`daily_${user.id}`);
    let timeout = 43000000;
    if (check !== null && timeout - (Date.now() - check) > 0) {
    time =  Date.now() - check;
      
      const timeLeft = ms(timeout - (Date.now() - check));
        return interaction.editReply(`❌ | Sorry You  already Claimed Your daily Reward Please Come Back In \` ${timeLeft} \` `)

    } else {
      let currency = `💸`;
  
        let worked = 25000;
            let diamonds  = Math.round(Math.random() * 1000);
        let diamond = [
            `${diamonds}`,
            `${diamonds}`,
            `${diamonds}`,
            `${diamonds}`
  ];
      
      
      let currentBank = await db.fetch(`bank_${user.id}`);
      db.set(`daily_${user.id}`, Date.now());
      

      let embed = new MessageEmbed()
        .setTitle(`  ${interaction.user.tag}  • Daily Reward`).setURL('https://discord.gg/c4-clan-community-917454141087965244')
        .setDescription(`
       • You can get up to \` ⏣ 25000 \` every day.`)
      .setThumbnail('https://cdn.discordapp.com/attachments/1045747079135371314/1046799860965322894/god_box.gif')

        .setColor(`#f3ae00`);

          

    

        const msg = await interaction.editReply({ embeds: [embed], components: [row]});
const collector = msg.channel.createMessageComponentCollector({
      componentType: "BUTTON",
  
    });



      
           collector.on("collect", async (interaction) => {
      if (interaction.customId === "YES") {
        
    time = Date.now() + 43000000 * 1;
              const embed1 = new MessageEmbed()
      
      .setTitle(`  ${interaction.user.tag}  • Daily Reward`).setURL('https://discord.gg/c4-clan-community-917454141087965244')
                .setDescription(`> \`⏣${worked}\` was placed in your wallet!`)
      .addField(`<:icons_coin:1039323037570433044> • Coins :`, `<:icons_text1:1039328684366114866>  \`⏣${worked}\`<a:Shiney_Gold_Coins_Inv:1056564821635649597>`,true)
                .addField(`<:DiamondS:1056578215969308682> • Diamond : `, `<:icons_text1:1039328684366114866>  \`${diamond[Math.floor(Math.random() * diamond.length)]}\`<a:Diamond:1056571440171860029>`,true)
        .setColor(`#f3ae00`)
      .addField(`<:icons_reminder:1056576428734435350> • Next Daily:`, `<:icons_text1:1039328684366114866> <t:${Math.round(time / 1000)}:R> `,true)
         .addField(`<:ss_eventcolour:963977835712745513> • Streak :`, `<:icons_text1:1039328684366114866> 0`,true)
        msg.edit({ embeds:[embed1], components: [bbb]});
    db.add(`money_${user.id}`, + worked)
         db.add(`diamond_${user.id}`, + diamonds)
        
      }
    })
  
         collector.on("collect", (buttonInteraction) => {
          const id = buttonInteraction.customId;
          if (id === "uiui") {
        
      
          buttonInteraction.edit({
embeds: [embed1],
ephemeral: true,

})
}
})
}
},
};