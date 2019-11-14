const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermissions("KICK_MEMBERS")) return message.channel.send("Helaasd je hebt geen TOEGANG!!");

    var user = message.guild.member(message.mentions.user.first() || message.guild.members.get(args[0]));

    if(!user) return message.channel.send("Geef een persoon op!");

    if (user.hasPermissions("KICK_MEMBERS")) return message.channel.send("Helaas je kan deze persoon niet warnen!");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op.");

    if(!warns[user.id]) warns[user.id] ={

        warns: 0
    };

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{
            if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
    .setDescription("Warn")
    .setColor("#ee0000")
    .addField("warned Persoon", banUser)
    .addField("Gewarnd door", message.author)
    .addField("Aantal warns", warns[user.id].warns)
    .addField("Reden", reason);

var warnChannel = message.guild.channels.find(`name`, "straf");
if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden OF maak een kanaal aan met de naam `straf`.");

warnChannel.send(warn);

}

module.exports.help = {
    name: "warn",
    description: "warn een persoon"
}