const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // ;tempmute @persoon 1h

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Helaas geen TOEGANG!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een persoon op!");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry je kan deze persoon niet muten");

    var muteRole = message.guild.roles.find("name", "muted");

    if(!muteRole) return message.channel.send("de role muted bestaat niet! \n MAAK AUB EEN ROLE `muted`!!");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("geef een tijd mee");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime} en heeft de role muted gekregen.`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is geunmuted.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute",
    description: "tempmute iemand"
}