const { Client, Collection } = require("discord.js");
const { Discord, Message, MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');
const config = require("./settings/config.json")
const fs = require('fs');
const db = require('quick.db')
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite')
const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
const talkedRecently = new Map();
// // Initializing the project
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });

client.login(config.token);

////////////////////////////////////////////
const levelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
if (!levelTable['count(*)']) {
  sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER, totalXP INTEGER);").run();
}

client.getLevel = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
client.setLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
// Role table for levels
const roleTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';").get();
if (!roleTable['count(*)']) {
  sql.prepare("CREATE TABLE roles (guildID TEXT, roleID TEXT, level INTEGER);").run();
}

// Prefix table
const prefixTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'prefix';").get();
if (!prefixTable['count(*)']) {
  sql.prepare("CREATE TABLE prefix (serverprefix TEXT, guild TEXT PRIMARY KEY);").run();
}


// Settings table
const settingsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';").get();
if (!settingsTable['count(*)']) {
  sql.prepare("CREATE TABLE settings (guild TEXT PRIMARY KEY, levelUpMessage TEXT, customXP INTEGER, customCooldown INTEGER);").run();
}

const channelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'channel';").get();
if (!channelTable['count(*)']) {
  sql.prepare("CREATE TABLE channel (guild TEXT PRIMARY KEY, channel TEXT);").run();
}

// XP Messages 
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // get level and set level
  const level = client.getLevel.get(message.author.id, message.guild.id)
  if (!level) {
    let insertLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (?,?,?,?,?,?);");
    insertLevel.run(`${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, 0, 0, 0)
    return;
  }

  let customSettings = sql.prepare("SELECT * FROM settings WHERE guild = ?").get(message.guild.id);
  let channelLevel = sql.prepare("SELECT * FROM channel WHERE guild = ?").get(message.guild.id);

  const lvl = level.level;

  let getXpfromDB;
  let getCooldownfromDB;

  if (!customSettings) {
    getXpfromDB = 16; // Default
    getCooldownfromDB = 1000;
  } else {
    getXpfromDB = customSettings.customXP;
    getCooldownfromDB = customSettings.customCooldown;
  }

  // xp system
  const generatedXp = Math.floor(Math.random() * getXpfromDB);
  const nextXP = level.level * 2 * 250 + 250
  // message content or characters length has to be more than 4 characters also cooldown
  if (talkedRecently.get(message.author.id)) {
    return;
  } else { // cooldown is 10 seconds
    level.xp += generatedXp;
    level.totalXP += generatedXp;
// message level up send image

    // level up!
    if (level.xp >= nextXP) {
      level.xp = 0;
      level.level += 1;

      let levelUpMsg;
      let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

      if (!customSettings) {
        embed.setDescription(`**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`);
        levelUpMsg = `**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`;
      } else {
        function antonymsLevelUp(string) {
          return string
            .replace(/{member}/i, `${message.member}`)
            .replace(/{xp}/i, `${level.xp}`)
            .replace(/{level}/i, `${level.level}`)
        }
        embed.setDescription(antonymsLevelUp(customSettings.levelUpMessage.toString()));
        levelUpMsg = antonymsLevelUp(customSettings.levelUpMessage.toString());
      }
      // using try catch if bot have perms to send EMBED_LINKS      
      try {
        if (!channelLevel || channelLevel.channel == "Default") {
          message.channel.send({ content: ` ${message.author}`, embeds: [embed] });
        } else {
          let channel = message.guild.channels.cache.get(channelLevel.channel)
          const permissionFlags = channel.permissionsFor(message.guild.me);
          if (!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
          channel.send({ content: ` ${message.author}`, embeds: [embed] });
        }
      } catch (err) {
        if (!channelLevel || channelLevel.channel == "Default") {
          message.channel.send({ content: ` ${message.author}`, embeds: [levelUpMsg] });
        } else {
          let channel = message.guild.channels.cache.get(channelLevel.channel)
          const permissionFlags = channel.permissionsFor(message.guild.me);
          if (!permissionFlags.has("SEND_MESSAGES") || !permissionFlags.has("VIEW_CHANNEL")) return;
          channel.send(levelUpMsg);
        }
      }
    };
    client.setLevel.run(level);
    // add cooldown to user
    talkedRecently.set(message.author.id, Date.now() + getCooldownfromDB);
    setTimeout(() => talkedRecently.delete(message.author.id, Date.now() + getCooldownfromDB))
  }
  // level up, time to add level roles
  const member = message.member;
  let Roles = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?")

  let roles = Roles.get(message.guild.id, lvl)
  if (!roles) return;
  if (lvl >= roles.level) {
    if (roles) {
      if (member.roles.cache.get(roles.roleID)) {
        return;


      }
      member.roles.add(roles.roleID);
    }
  }
})

////////////////////////// level system

setInterval(async () => {
  const db = require('quick.db');
  const schedule = require('node-schedule');
  
  const guilds = client.guilds.cache; // Get all the guilds the bot is in
  const currentTime = Date.now();

  guilds.forEach(async (guild) => {
      const keys = await db.all(); // Retrieve all keys from the database for this guild

      keys.forEach(async (entry) => {
          if (entry.ID.startsWith(`TempRole_${guild.id}_`)) {
              const storedData = await db.get(entry.ID);
              if (storedData && storedData.duration <= currentTime) {
                  const member = guild.members.cache.get(entry.ID.split('_')[2]);

                  if (member) {
                      const roleToRemove = guild.roles.cache.get(storedData.role);
                      if (roleToRemove) {
                          await member.roles.remove(roleToRemove);
                          await db.delete(entry.ID);
                      }
                  }
              }
          }
      });
  });
}, 1000);




//////////////////////////////////
client.on('messageCreate', async (message) => {
  if (message.content) {
    if (message.channel.id !== '1091148035582591080') return;
    message.delete();
    let userup = [];
    let userdown = [];
    let show1 = [];
    let show2 = [];
    let down = 0;
    let up = 0;
    const embed = new MessageEmbed()
      .setDescription(`${message.content}`)
      .addFields(
        { name: 'Up Votes :', value: `\`\`\`${up}\`\`\``, inline: true },
        { name: 'Down Votes :', value: `\`\`\`${down}\`\`\``, inline: true }
      )
      .setThumbnail(message.member.displayAvatarURL())
      .setFooter('Made By : @Finale (:')
      .setTitle('Suggestions');
    const button = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('up')
          .setEmoji('⬆')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('down')
          .setEmoji('⬇')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId('show')
          .setLabel('إظهار الاقتراحات')
          .setStyle('SECONDARY')
      );
    const collect = await message.channel.send({ embeds: [embed], components: [button] });
    const cc = await collect.createMessageComponentCollector({ componentType: 'BUTTON' });

    cc.on('collect', async (int) => {
      if (int.isButton()) {
        if (int.customId === 'up') {
          if (userup.includes(int.member.id)) {
            up -= 1;
            userup = userup.filter((userId) => userId !== int.member.id);
            int.update({ embeds: [embed.setFields({ name: 'Up Votes :', value: `\`\`\`${up}\`\`\``, inline: true }, { name: 'Down Votes :', value: `\`\`\`${down}\`\`\``, inline: true })] });
          } else {
            userup.push(int.member.id);
            up += 1;
            int.update({ embeds: [embed.setFields({ name: 'Up Votes :', value: `\`\`\`${up}\`\`\``, inline: true }, { name: 'Down Votes :', value: `\`\`\`${down}\`\`\``, inline: true })] });
          }
        } else if (int.customId === 'down') {
          if (userdown.includes(int.member.id)) {
            down -= 1;
            userdown = userdown.filter((userId) => userId !== int.member.id);
            int.update({ embeds: [embed.setFields({ name: 'Up Votes :', value: `\`\`\`${up}\`\`\``, inline: true }, { name: 'Down Votes :', value: `\`\`\`${down}\`\`\``, inline: true })] });
          } else {
            userdown.push(int.member.id);
            down += 1;
            int.update({ embeds: [embed.setFields({ name: 'Up Votes :', value: `\`\`\`${up}\`\`\``, inline: true }, { name: 'Down Votes :', value: `\`\`\`${down}\`\`\``, inline: true })] });
          }
        } else if (int.customId === 'show') {
          userup.forEach((u, i) => {
            show1.push(`${i + 1} : <@${u}>`);
          });
          userdown.forEach((u, i) => {
            show2.push(`${i + 1} : <@${u}>`);
          });
          const emb2 = new MessageEmbed()
            .addFields(
              { name: 'Up', value: `${show1.length > 0 ? show1.join('\n') : '0'}`, inline: true },
              { name: 'Down', value: `${show2.length > 0 ? show2.join('\n') : '0'}`, inline: true }
            );
          int.reply({ embeds: [emb2], ephemeral: true });
          show1.splice(0, show1.length);
          show2.splice(0, show2.length);
        }
      }
    });
  }
});

