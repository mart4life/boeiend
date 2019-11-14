const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("Ip van de server")
        .setColor("#RANDOM")
        .setThumbnail(botIcon)
        .addField("Ip:", "Play.UnitedMC.nl");

        return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "ip",
    description: "Krijg de ip van de server"
}