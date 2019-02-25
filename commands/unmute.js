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


    let User = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!User) return message.reply("Кого размьючиваем-то?");
        let reason = args[1];
        console.log("Размут")
        let muted = message.guild.roles.find(r => r.name === "muted");
        if(!User.roles.has(muted.id)) return message.reply("Челик и так не замьючен.");
        await(User.removeRole(muted.id));
        message.channel.send(`${User} размьючен.`)
  }

module.exports.help = {
  name: "размут"
}
