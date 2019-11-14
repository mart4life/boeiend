const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log('Kan helemaal geen FILES vinden!');
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is lekker bezig`);

    bot.user.setActivity("Snoep eten", { type: "PLAYING" });

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Nieuweling");

    if (!role) return message.reply("MAAK EEN ROLE AAN DIE HEET `Nieuweling`!!");

    member.addRole(role);

    const channel = member.guild.channels.find("name", "welkom");

    if (!channel) return message.reply("MAAK EEN CHANNEL AAN DIE HEET `welkom`!!");

    channel.send(`Welkom op de server ${member}!`);

});

bot.on("guildMemberAdd", member => {
 
    const channel = member.guild.channels.find("name", "welkom");
    if (!channel) console.log("maak een kanaal aan die welkom heet.");
 
    var joinEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**.`)
        .setColor("#00FF00")
        .setTimestamp()
        .setFooter("Gebruiker gejoined.");
 
    channel.send(joinEmbed);
 
});

bot.on("guildMemberRemove", member => {
 
    const channel = member.guild.channels.find("name", "leave");
    if (!channel) console.log("maak een kanaal aan die leave heet.");
 
    var joinEmbed = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Jammer dat je weg ben gegaan ${member.user.tag} :(`)
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter("Gebruiker Geleaved.");
 
    channel.send(joinEmbed);
 
});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, arguments);


});


bot.login(process.env.token);