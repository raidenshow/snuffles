const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botconfig = require("./botconfig.json");
const modRoles = botconfig.modRoles;
const logChannel= botconfig.logChannel;
const bannedLinks = botconfig.bannedLinks
const hiChannel = botconfig.hiChannel
const ms = require("ms");
const isUrl = require("is-url");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }




  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log('Бот онлайн!');
});

bot.on('guildMemberAdd', member => {
    member.guild.channels.get(hiChannel).send('**' + member.user.username + '** теперь с нами! Поприветствуем!');
});

bot.on('guildMemberRemove', member => {
    member.guild.channels.get(hiChannel).send('**' + member.user.username + '** покинул нас... Земля тебе пухом, братишка...');
});


bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let scanuser = bot.commands.get("scanuser");
  scanuser.run(bot, message, args);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});


bot.login(process.env.BOT_TOKEN);
