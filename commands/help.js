const discord = require("discord.js");
const botConfig = require("../botconfig.json")
 
module.exports.run = async (bot, message, args) => {
 
    var commandsList = [];
 
    bot.commands.forEach(command => {
 
        var item = {
 
            name: command.help.name,
            description: command.help.description,
            // category: command.help.category
 
        }
 
        commandsList.push(item);
 
    });
 
    // console.log(commandsList);
 
    var prefix = botConfig.prefix;
    var response = "";
 
    for (var i = 0; i < commandsList.length; i++) {
 
        response += `${prefix}${commandsList[i]["name"]} - ${commandsList[i]["description"]} \r\n`;
 
    }
 
    message.author.send(response).then(() => {
 
        message.channel.send("Je hebt het help menu binnen!");
 
    }).catch(() => {
 
        message.channel.send("Je privé berichten staan uit geschakeld, je hebt geen hulp ontvangen");
 
    });
 
}
 
module.exports.help = {
    name: "help",
    description: "Krijg het help menu"
}