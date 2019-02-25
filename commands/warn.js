const Discord = require("discord.js");
const Warn = require("../models/warn.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Так могут только модеры и админы :)");
  mongoose.connect('mongodb+srv://raidenshow:Sosipisos228@rraidenterritory-nmzid.mongodb.net/Warns',  { useNewUrlParser: true });
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Нет такого челика...");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Этого челика варнить нельзя...");
  let wreason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", wreason);

  let warnchannel = message.guild.channels.find(channel => channelName === "log");
  if(!warnchannel) return message.reply("Не могу найти лог чат");

  warnchannel.send(warnEmbed);

  // if(warns[wUser.id].warns == 5){
  //   let muterole = message.guild.roles.find(`name`, "muted");
  //   if(!muterole) return message.reply("Нет роли muted");
  //
  //   let mutetime = "10s";
  //   await(wUser.addRole(muterole.id));
  //   message.channel.send(`<@${wUser.id}> был замьючен.`);
  //
  //   setTimeout(function(){
  //     wUser.removeRole(muterole.id)
  //     message.reply(`<@${wUser.id}> был размьючен.`)
  //   }, ms(mutetime))
  // }
  // if(warns[wUser.id].warns == 3){
  //   message.guild.member(wUser).ban(reason);
  //   message.reply(`<@${wUser.id}> has been banned.`)
  // }

const warn = new Warn({
  _id: mongoose.Types.ObjectId(),
  userID: wUser.id,
  username: wUser.user.username,
  warnReason: wreason,
  moderatorNickname: message.author.username,
  when: message.createdAt,
  channelName: message.channel
});

warn.save()
.then(result => console.log(result))
.cath(err => console.log(err));

message.reply("Варн засчитан.")
}

module.exports.help = {
  name: "варн"
}
