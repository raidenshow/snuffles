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


      var deleteCount = parseInt(args[0], 10);
      var deletedCountup = deleteCount + 1;
      if(!deleteCount || deleteCount < 1 || deleteCount > 100)
        return message.reply("Укажи, сколько сообщений надо удалить (от 1 до 100)");

      const fetched = await message.channel.fetchMessages({limit: deletedCountup});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Не могу удалить сообщения по причине:${error}`));

      message.reply(`${deleteCount} сообщений удалено, сэр... мэм...сэрмэм?!`)
       .then(message => {
       message.delete(5000)});

      return;
}

module.exports.help = {
  name: "удалить"
}
