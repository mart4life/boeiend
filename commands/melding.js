const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("GEEN TOEGANG!");

 var splitser = "//";

 if(args[0] == null){

        var useMessage = new discord.RichEmbed()
        .setTitle("gebruik")
        .setColor("#RANDOM")
        .setDescription(`Maak een melding via deze command! \n !melding Title ${splitser} bericht ${splitser} kleur ( via google color picker ) ${splitser} welke kanaal? ( GEBRUIK INGEVAL DE KANAAL meldingen (staat in de config zo DUS MAAK ER 1 AAN ( en zonder # aub invoeren!)))`);

        return message.channel.send(useMessage);

 }

 args = args.join(" ").split(splitser);

 if(args[2] == undefined) args[2] = "#ee0000";
 if (args[3] == undefined) args[3] = "meldingen"

 var options = {

        title: args[0] || "melding",
        bericht: args[1] || "Geen bericht meegegeven",
        kleur: args[2].trim(),
        kanaal: args[3].trim()

 }

 var announcer = message.author;

 var announcementEmbed = new discord.RichEmbed()
 .setTitle("Melding")
 .setColor(options.kleur)
 .setDescription(`Bericht van ${announcer} \n\n ${options.title} \n\n ${options.bericht} \n`)
 .setTimestamp();

 var announcementChannel = message.guild.channels.find(`name`, options.kanaal);
 if(!announcementChannel) return message.channel.send("MAAK EEN KANAAL AAN DIE HEET meldingen of er is iets fout");

 announcementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "melding",
    description: "Schrijf een melding"
}