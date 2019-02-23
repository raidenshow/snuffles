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

  if(cmd === prefix + "say"){
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }


  if(command === "кик") {
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("У нас такого челика нет...");
    if(!member.kickable)
      return message.reply("Этого челика кикать нельзя...");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана";

    await member.kick(reason)
      .catch(error => message.reply(`Сорян, ${message.author}. Я не могу кикнуть этого челика потому, что: ${error}`));
    message.reply(`${member.user.tag} был кикнут модератором ${message.author.tag} по причине: ${reason}`);

  }


  if(command === "бан") {
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("У нас такого челика нет...");
    if(!member.bannable)
      return message.reply("Этого челика банить нельзя...");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана";

    await member.ban(reason)
      .catch(error => message.reply(`Сорян, ${message.author}. Я не могу забанить этого челика потому, что: ${error}`));
    message.reply(`${member.user.tag} был забанен модератором ${message.author.tag} по причине: ${reason}`);
  }


});

bot.login(botconfig.token);
