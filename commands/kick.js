const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if (!kickUser) return message.channel.send("Helaas de persoon is niet gevonden!!");

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Helaas je kan dit helemaal niet :O  :thinking:");

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze persoon kan je niet kicken :O");

    var kick = new discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#ee0000")
        .addField("Kicked Persoon", kickUser)
        .addField("Gekickd door", message.author)
        .addField("Reden", reason);

    var kickChannel = message.guild.channels.find(`name`, "straf");
    if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden OF maak een kanaal aan met de naam `straf`.");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return;

}

module.exports.help = {
    name: "kick",
    description: "kick een persoon"
}