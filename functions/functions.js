const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

module.exports = {

    loadCommands: function(bot, dirname) {
        fs.readdir(dirname, (err, files) => {
            if(err) console.error(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0){
                console.log(`Aucune commande à charger dans le dossier: ${dirname.replace(/.\/commands\//gi, "")}`);
                return;
            }

            console.log("");
            console.log(`Commands ${dirname.replace(/.\/commands\//gi, "")}`);
            console.log("");
            jsFiles.forEach((f, i) => {
                delete require.cache[require.resolve(`${dirname}${f}`)];
                var props = require(`${dirname}${f}`);
                console.log(`${i + 1}: ${f} Chargée`);
                bot.commands.set(props.help.name, props);

                if(props.help.aliases) for (const alias of props.help.aliases){
                    bot.aliases.set(alias, props);
                }
            })
        })
    },

    error: function(channel) {
        let errorEmbed = new Discord.MessageEmbed()
        .setColor(color.red)
        .setDescription(`\\🛑 **Erreur ** `);
        channel.send(errorEmbed).catch(e => {console.log(e)});
    }, 

    success: function(channel) {
        let errorEmbed = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription(`\\✅ **Succès **`);
        channel.send(errorEmbed).catch(e => {console.log(e)});
    }, 

}
