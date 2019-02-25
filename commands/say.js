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



module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
  return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send(sayMessage);
}

module.exports.help = {
  name: "say"
}
