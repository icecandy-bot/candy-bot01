const { Client, Collection } = require("discord.js");
const { Discord, Message, MessageActionRow, MessageButton, MessageEmbed, Formatters, MessageAttachment } = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
//developer by tn_hazem

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
//developer by tn_hazem
// // Initializing the project
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });//developer by tn_hazem

client.login(process.env.token);

process.on("unhandledRejection", error => {
  return;
});
process.on("unhandledRejection", error => {
  return;
});
process.on("unhandledRejection", error => {
  return;
});//developer by tn_hazem