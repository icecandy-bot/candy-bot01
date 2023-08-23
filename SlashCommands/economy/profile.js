const { MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');
const ms = require('ms');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite')
const { default: fetch } = require("node-fetch");
const moment = require("moment")
const { Canvas, loadImage } = require('canvas-constructor/cairo');
const path = require('path');
const db = require('quick.db')
const { millify } = require("millify");
const flags = {
  HOUSE_BRAVERY: "https://cdn.discordapp.com/attachments/1045747079135371314/1045752498213888040/BadgeHypeSquadBravery.png",
  HOUSE_BRILLIANCE: "https://cdn.discordapp.com/attachments/1045747079135371314/1045752498595565649/BadgeHypeSquadBrilliance.png",
  HOUSE_BALANCE: "https://cdn.discordapp.com/attachments/1045747079135371314/1045752497622495242/BadgeHypeSquadBalance.png",};
  const dsfs = {
    ACTIVE_DEVELOPER: 'https://cdn.discordapp.com/attachments/917473078009806868/1143359075619450910/dss.png',};
  
module.exports = {
  name: "profile",
  category: "general",
  description: "Shows Yours or someone Profile card.",
  options: [
    {
      name: 'target',
      description: 'the targeted user',
      type: 6
    }
  ],
  run: async (client, interaction, args) => {

     const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();
    const user = interaction.options.getMember('target') || interaction.member;
    if (!interaction.guild.members.cache.get(user.id)) return interaction.followUp("User is not in this server.")
    if (user.user.bot) return;

const response = await fetch(
      `https://japi.rest/discord/v1/user/${user.id}`
    );
    const data = await response.json(); //public_flags_array
     let badges = data.data.public_flags_array
      ? data.data.public_flags_array.map((flag) => flags[flag]).join(" ")
      : ``;
  let shoes = await db.fetch(`nikes_${user.id}`)
  if(shoes === null) shoes = '0'
  let newcar = await db.fetch(`car_${user.id}`)
  if(newcar === null) newcar = '0'
  let newhouse = await db.fetch(`house_${user.id}`)
  if(newhouse === null) newhouse = '0' 
  let thanksl = db.fetch(`userthanks_${user.id}`);
  if (thanksl === null) thanksl = 0; 
   const {member,guild} = client;
  let vip = db.fetch(`bronze_${user.id}`)
  if (vip === null) vip = '0'
  if (vip === true) vip = '1'

    
    let bal = db.fetch(`money_${user.id}`);
    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;
  let diamond = await db.fetch(`diamond_${user.id}`);
    if (diamond === null) diamond = 0;

    
        let bg = db.fetch(`bg_${user.id}`)
    if (bg === null) bg = 'https://cdn.discordapp.com/attachments/1057730209056559174/1061743096511074374/ezfszgzsgze.png'
            let badges2s = db.fetch(`badge_${user.id}`)
    if (badges2s === null) badges2s = 'https://cdn.discordapp.com/attachments/917473078009806868/1143354983291555920/regdfghe.png'
            let badges3s = db.fetch(`baddfge_${user.id}`)
    if (badges3s === null) badges3s = 'https://cdn.discordapp.com/attachments/917473078009806868/1143354983291555920/regdfghe.png'
                let badges4s = db.fetch(`badfdges_${user.id}`)
    if (badges4s === null) badges4s = 'https://cdn.discordapp.com/attachments/917473078009806868/1143354983291555920/regdfghe.png'
    let badges3 = await loadImage(badges3s);
      let badges4 = await loadImage(badges4s);
    let background = await loadImage(bg);
   let ssbb = await loadImage(badges || "https://cdn.discordapp.com/attachments/917473078009806868/1143354983291555920/regdfghe.png");
   let badges2 = await loadImage(badges2s);

    let avatar = await loadImage(user.user.displayAvatarURL({ format: 'png', size: 512 }));
    let fetchInfo = await db.fetch(`info_${user.id}`) || "No BIO"; 

    let ctx = new Canvas(background.width, background.height) // لا تعدل
      
      .printImage(background, 0, 0, background.width, background.height) // لا تعدل 
      .printCircularImage(avatar, 136, 134, 88) // لا تعدل    //x : 102, y : 115, size : 100
      .printCircularImage(ssbb, 750, 185, 29)
      .printCircularImage(badges2, 688, 185, 29)
      .printCircularImage(badges3, 630, 185, 29)
      .printCircularImage(badges4, 570, 185, 29)
      .setTextFont('bold 20px monospace') // لا تعدل 
      .setTextSize(45) // لا تعدل
      .setColor('#ffffff')
      .printText(millify(parseInt(bal)),  99, 285)
      .printText(user.user.username, 250, 200, 500) // لا تعدل    //user.user.tag = x : 20, y : 280 20, 240
      .printText(diamond, 99, 360) 
      .printText(thanksl, 100, 506) 
       //.printText(levelInfo|| "n", 225, 438)
      .setTextFont('bold 20px monospace') // لا تعدل 
      .setColor('#9a9a9a')
      .setTextSize(25) // لا تعدل
      .printText(fetchInfo, 330, 365)
      .setTextFont('bold 20px monospace') // لا تعدل 
      .setColor('#ffffff')
      .setTextSize(19)
      //.printText(`${xpInfo || "0"}`, 280, 407) 

      .toBuffer(); // لا تعدل

    let buf = new MessageAttachment(ctx, 'profile.png'); 


    
      
const row2 = new MessageActionRow() 
  .addComponents(
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Rep')
      .setEmoji("1037850528329248791")
      .setCustomId('clicked'),
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Skin')
      .setEmoji("1057838988888645743")
      .setCustomId('222ss'),

        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Inventory')
     .setDisabled(true)
      .setEmoji("1039537984602644510")
      .setCustomId('clicke'),

			);
const row2sss = new MessageActionRow() 
  .addComponents(
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Rep')
      .setDisabled(true)
      .setEmoji("1037850528329248791")
      .setCustomId('clicked'),
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Skin')
      .setEmoji("1057838988888645743")
      .setCustomId('222ss'),

        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Inventory')
      .setEmoji("1039537984602644510")
      .setCustomId('clicke'),

			);
    
const sssssbb = new MessageActionRow() 
 .addComponents(
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Rep')
   
      .setEmoji("1037850528329248791")
      .setCustomId('clicked'),
        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Skin')
      .setEmoji("1057838988888645743")
      .setCustomId('222ss'),

        new MessageButton()
          .setStyle('SECONDARY')
      .setLabel('Inventory')
      .setDisabled(true)
      .setEmoji("1039537984602644510")
      .setCustomId('clicke'),
	);
    
const GFRD = new MessageActionRow() 
  .addComponents(
    new MessageButton()
          .setStyle('SECONDARY')
      .setEmoji("1037850528329248791")
      .setDisabled(true)
      .setCustomId('clicked'),
    
			);
    const qsfd = new MessageActionRow() 
  .addComponents(
    new MessageButton()
          .setStyle('PRIMARY')
      .setLabel(`Total reps ${thanksl}`)
      .setEmoji("1037850528329248791")
      .setDisabled(true)
      .setCustomId('SSS'),
    
			);
      let em1 = new MessageEmbed()

  
     .setDescription('Soon')


        const msg = await interaction.followUp({ files: [buf], embeds: [], components: [row2] });
const collector = msg.createMessageComponentCollector({
      componentType: "BUTTON",

    });


    collector.on("collect", async (interaction) => {
      if (interaction.customId === "ssvv") {
        interaction.reply({content :`**<:emoji2:963893728471314572>`, ephemeral: true})
        msg.edit({embeds:[], components: [row2] , files: [buf], ephemeral: true});
       
      }
    })
        collector.on("collect", async (interaction) => {
      if (interaction.customId === "clicked") {
        
    const check = await db.fetch(`reps_${interaction.member.id}`);
    let timeout = 200000;
    if (check !== null && timeout - (Date.now() - check) > 0) {
      
      
      const timeLeft = ms(timeout - (Date.now() - check));
        return  interaction.reply({content:`**❌ | Your are on cooldown** Time left: \`${timeLeft}\` remaining`, ephemeral: true})
    } else {
                db.set(`reps_${interaction.member.id}`, Date.now());
                db.add(`userthanks_${user.id}`,1)
        interaction.reply({content :`**<:emoji11:1037850528329248791> success add \`1\` rep to <@${target.user.id}> **`, ephemeral: true})
          
      msg.edit({  embeds:[],components: [row2sss] , files: [buf], ephemeral: true});    
    }}})
                 
    collector.on("collect", async (interaction) => {
      if (interaction.customId === "clicke") {
        msg.edit({ embeds:[em1], components: [sssssbb] , files: [], ephemeral: true});
   
      }
    })
       
  }
}
