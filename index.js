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
const YTDL = require("ytdl-core");
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
var servers = {};

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

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


  //////music
  if((message.content.charAt(0) === prefix && cmd == prefix+"плей")){
    let link = args[0];
    if(!link)
      return message.reply("Введи ссылку на трек");
    if(isUrl(link) !== true)
      return message.reply("Это не ссылка на трек :(");
    if(!message.member.voiceChannel)
      return message.reply("Войди в голосовой канал!");
    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };
    var server = servers[message.guild.id];
    server.queue.push(args[0]);
    console.log("Queue is: " + server.queue);
    if(!message.guild.voiceConnection)
      message.member.voiceChannel.join().then(function(connection) {
      play(connection, message);
    });
  }

  if(message.content == prefix + "пропустить"){

    var server = servers[message.guild.id];

    if(server.dispatcher)
      server.dispatcher.end();
  }

  if(message.content == prefix + "стпо"){

    var server = servers[message.guild.id];

    if(message.guild.voiceConnection)
      message.guild.voiceConnection.disconnect();
  }
  //////


});


bot.login(process.env.BOT_TOKEN);
