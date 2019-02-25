const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const modRoles = botconfig.modRoles;


module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(r=>modRoles.includes(r.name)) )
          return message.reply("Сорян, ты должен быть модератором или администратором, чтобы пользоваться этой командой!");

        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tomute) return message.reply("Кого мьютим-то?");
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Этого челика мьютить нельзя...");
        let reason = args.slice(2).join(" ");
        let muterole = message.guild.roles.find(r => r.name === "muted");

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
  message.channel.send(`${tomute} был замьючен(а) на ${mutetime}`)


      await(tomute.addRole(muterole.id));

      setTimeout(function(){
        tomute.removeRole(muterole.id);
      }, ms(mutetime));
}

module.exports.help = {
  name: "мут"
}
