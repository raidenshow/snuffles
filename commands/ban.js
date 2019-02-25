const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const modRoles = botconfig.modRoles;


module.exports.run = async (bot, message, args) => {
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

module.exports.help = {
  name: "бан"
}
