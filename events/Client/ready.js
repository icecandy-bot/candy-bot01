const client = require("../../index");
const set = require("../../settings/settings.js");
const chalk = require('chalk')
console.clear()

client.on("ready", () => {
    console.log(chalk.greenBright(`
╔═════════════════════════════════════════════╗
║                                             ║
║        ${client.user.username} IS NOW ONLINE.......         ║
║                                             ║
╚═════════════════════════════════════════════╝
╔═════════════════════════════════════════════╗
║                                             ║
║       [developer by TN hazem#6101]          ║
║                                             ║
╚═════════════════════════════════════════════╝
`
    ))
});


client.on('ready', async () => {
  
  
    const activites = [
        {name: `${client.guilds.cache.size}  Servers`, type: "STREAMING",url:"https://www.twitch.tv/56801121"},
        {name: ` ${client.users.cache.size}  users`, type: "STREAMING",url:"https://www.twitch.tv/56801121"},
        {name: `Handler Version: ${set.handlerVersion}`, type: "STREAMING", url:"https://www.twitch.tv/56801121"},
        {name: `C4 Clan Community`, type: "STREAMING",url:"https://www.twitch.tv/56801121"},
    ]
    let activity = 0
    client.user.setPresence({status: "online", activity: activites[0]})
    setInterval(() => {
        if(activity === activity.length) return activity = 0;
        activity++
        client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
    }, 200 * 200);
});

