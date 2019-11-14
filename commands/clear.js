const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Je hebt helemaal geen TOEGANG! :angry:");

    if(!args[0]) return message.channel.send("Geef een getal op! MAX 99");

    if(Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

        if(args[0] == 0){

                message.channel.send(`JEMIG JEMIG JEMIG ik kan toch geen 0 berichten laten verdwijnen!`).then(msg => msg.delete(5000));

        } else if (args[0] == 1){

            message.channel.send(`er is 1 bericht verdwenen`).then(msg => msg.delete(3000));

        } else {

            message.channel.send(`er zijn ${args[0]} berichten zijn verdwenen`).then(msg => msg.delete(3000));

        };

    } else {
        return message.channel.send("Geef eem getal op! MAX 99")
    }

}

module.exports.help = {
    name: "clear",
    description: "Clear een chat"

}