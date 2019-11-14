const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));

    if (!banUser) return message.channel.send("Helaas de persoon is niet gevonden!!");

    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("ban_MEMBERS")) return message.channel.send("Helaas je kan dit helemaal niet :O  :thinking:");

    if (banUser.hasPermission("ban_MEMBERS")) return message.channel.send("Deze persoon kan je niet bannen :O");

    var ban = new discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ee0000")
        .addField("banned Persoon", banUser)
        .addField("Geband door", message.author)
        .addField("Reden", reason);

    var banChannel = message.guild.channels.find(`name`, "straf");
    if (!banChannel) return message.guild.send("Kan het kanaal niet vinden OF maak een kanaal aan met de naam `straf`.");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);

}

module.exports.help = {
    name: "ban",
    description: "Ban een member"

}