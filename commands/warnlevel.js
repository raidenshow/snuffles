const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };



  if(!wUser) return message.reply("Нет такого челика :(");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> получил ${warnlevel} предупреждений.`);

}

module.exports.help = {
  name: "варны"
}
