const Discord = require("discord.js");
const functions = require("../../functions/functions");
const haste = require('hastebin-save');
const moment = require('moment');

exports.run = async (bot, message, args, hastebin) => {

    if(message.channel.type !== "dm" && !message.author.bot && !message.channel.name.startsWith(`mp-`) && !isNaN(message.channel.topic)) return functions.error(message.channel, "Cette commande ne peut être exécutée que dans un salons de ticket.");

 const channelstaff = bot.channels.cache.get("816659726187888691");

    if(!channelstaff) return;

    guildSupport = bot.guilds.cache.find(c => c.id === bot.config.serverID);
    if(!guildSupport) return console.log(`818474519463198752`);

    let ticketSupport = guildSupport.roles.cache.find(r => r.name === "Ticket Support");
    if(!ticketSupport) {
        guildSupport.roles.create({data:{name: "🔴 | Weazel News", permissions: 3}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
        functions.error(message.channel, "Le rôle de support vient d'être créé, veuillez refaire cette commande.");
        return;
    }

    if(!message.guild.member(message.author).roles.cache.has(ticketSupport.id)) return functions.error(message.channel, `The ${ticketSupport} role is required for this command.`);

    let user = bot.users.cache.find(u => u.id === message.channel.topic);
    if(!user) return functions.error(message.channel, "Impossible de trouver cet utilisateur.");

    const closeEmbed = new Discord.MessageEmbed()
    .setAuthor(`🗑️ | Ticket Close`)
    .setColor(bot.color.blue)
    .setTimestamp()
    .setFooter(`Renvoyez un message pour rouvrir un ticket.`)
    .setDescription(`
    `)
    .addField(`Le support a marqué votre requête comme classée, merci à toi inutile de répondre après ce message`, [
        `\``
    ]);

    let msg_channel = await message.channel.messages.fetch()
    const mapped = msg_channel.map((msg) => msg.author.bot?msg.author.id == bot.user.id?msg.embeds.length>0?`[ ${moment(msg.createdTimestamp).format('DD/MM/YYYY | HH:mm:ss')} ] <BOT> ${msg.embeds[0].author?msg.embeds[0].author.name:msg.embeds[0].title?msg.embeds[0].title:"Inconnu"}: ${msg.embeds[0].description}`:null:null:`[ ${moment(msg.createdTimestamp).format('DD/MM/YYYY | HH:mm:ss')} ] ${msg.author.username}: ${msg.content}`).join('\n');
    haste.upload(mapped, (link) => {

    const EmbedStaffTicket = new Discord.MessageEmbed()
    .setAuthor(`🗑️ | Ticket Close`)
    .setColor(bot.color.blue)
    .setTimestamp()
    .setDescription(`Le Ticket (#${message.channel.name}) est supprimé Par ${message.author.tag} (${message.author.id})\n\nArchive de la conversation : [Liste des Messages](https://hastebin.com/${link})`)
    channelstaff.send(EmbedStaffTicket);
    });

    user.send(closeEmbed)
    .then(m => {
        message.channel.delete().catch(e => {return functions.error(message.channel, "Impossible de supprimer les message.")});
    });
    
    
}

exports.help = {
    name: "end",
    aliases: [],
    category: "Utilities"
}

exports.requirements = {
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}