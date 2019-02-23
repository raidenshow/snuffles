const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();



bot.on("ready", async () => {
  console.log('${bot.user.username} is online!');
});



bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);



});

bot.login(botconfig.token);

fgfggg
