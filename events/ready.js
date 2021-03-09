const Discord = require("discord.js");

module.exports = async (bot) => {

    bot.user.setActivity(`MP pour contacter le Weazel News`, { type: "PLAYING" })
    console.log(`${bot.user.username} est pret !`);

} 
