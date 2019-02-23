const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

const modRoles = botconfig.modRoles;

bot.on("ready", async () => {
  console.log('Бот онлайн!');
});



bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === prefix + "пинг"){
    return message.channel.send("понг!");
  }

  if(cmd === "say"){
    if(!message.member.roles.some(r=> modRoles.includes(r.name)) )
      return message.reply("Сорян, но ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }


});

bot.login(botconfig.token);
