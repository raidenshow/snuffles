const Discord = require("discord.js");

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
