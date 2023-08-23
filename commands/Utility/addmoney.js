const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "addmoney",
    description: "Add money to another user",
    aliases: ['add'],
    emoji: "💰",
    run: async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("❌ You need the **[ADMINISTRATOR]** permission to use this command");
        if (!args[0]) return message.channel.send("**Please choose a username**")

           
 let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
        if (!user) return message.channel.send("**Please fill in the object!**")
        if (!args[1]) return message.channel.send("**Please enter the amount!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Your amount must be in digits!**`);
        
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`✅ You added ${args[1]} coins\n\nTotal account: `);
        message.channel.send({embeds: [moneyEmbed]})

    }
}