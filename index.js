const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

const modRoles = botconfig.modRoles;
const logChannel= botconfig.logChannel;

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


  if(cmd === prefix + "кик") {
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Кого кикать-то?");
    if(!member.kickable)
      return message.reply("Этого челика кикать нельзя...");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана";

    await member.kick(reason)
      .catch(error => message.reply(`Сорян, ${message.author}. Я не могу кикнуть этого челика потому, что: ${error}`));
    message.reply(`${member.user.tag} был кикнут модератором ${message.author.tag} по причине: ${reason}`);

  }


  if(cmd === prefix + "бан") {
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Кого банить-то?");
    if(!member.bannable)
      return message.reply("Этого челика банить нельзя...");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Причина не указана";

    await member.ban(reason)
      .catch(error => message.reply(`Сорян, ${message.author}. Я не могу забанить этого челика потому, что: ${error}`));
    message.reply(`${member.user.tag} был забанен модератором ${message.author.tag} по причине: ${reason}`);
  }


  if(cmd === prefix + "удалить") {
    if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
      return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");


    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Укажи, сколько сообщений надо удалить (от 2 до 100)");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Не могу удалить сообщения по причине:${error}`));

    message.reply(`${deleteCount} сообщений удалено, сэр... мэм...сэрмэм?!`)
     .then(message => {
     message.delete(5000)});

    return;
  }

    if(cmd === prefix + "мут") {
      if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
        return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Этого челика мьютить нельзя...");
      let reason = args.slice(2).join(" ");
      let muterole = message.guild.roles.find(`name`, "muted");

      if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
if(!mutetime) return message.reply("Укажи время мьюта...");

message.delete().catch(O_o=>{});

try{
    await tomute.send(`Чел, ты был замьючен на ${mutetime}. Не шали!)`)
  }catch(e){
    message.channel.send(`Челик был замьючен... но его ЛС закрыто. Мьют на ${mutetime}`)
  }

    await(tomute.addRole(muterole.id));

    setTimeout(function(){
      tomute.removeRole(muterole.id);
    }, ms(mutetime));
    }


if(cmd === prefix + "размут") {

  let User = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!User) return message.reply("Нет такого челика...");
      let reason = args[1];
      console.log("Размут")
      let muted = message.guild.roles.find(`name`, "muted");
      if(!User.roles.has(muted.id)) return message.reply("Челик и так не замьючен.");
      await(User.removeRole(muted.id));
}



});

bot.login(botconfig.token);
