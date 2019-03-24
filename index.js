 /*
  
*/
const self = require("discord.js");
let notice = new self.Client()
let setting = require("./setting.json");
notice.on("ready", function () {
    console.log(`Logged in as ${notice.user.tag}!`);
});

notice.on("message", function (msg) {
   let cmd = msg.content
   let channel = msg.channel
   let guild = msg.guild
   let owner = setting.ID
   let prefix = setting.prefix
   let command = setting.cmd
   let chl = setting.channel
   let makename = setting.makename

  if(cmd.startsWith(prefix + command)){
    if (msg.author.id !== owner) return;
      var args = msg.content.slice(3);
    try {
          channel.send("보내는중..").then(async msg1 => {
            var gw = notice.guilds.array().forEach(g => {
                const no = g.channels.find(ch => ch.name === chl);
                if (!no) {
                    return;
                } else {
                    no.send(args)
                }
            });
            msg1.delete();
              let string = '';
              notice.guilds.forEach(chl => {
                  string += chl.name + '\n';
              })
            const Success = new self.RichEmbed()
                .setTitle("Success")
                .addField("Contents", `Contents: ${args}`)
                .addField("Channels", `${chl.length} Sent to channels!`, false)
                .addBlankField()
                .addField("Guild", "```" + string + "```", true)
                .setTimestamp();
            channel.send(Success);
            return;
        });
    } catch (e) {
       console.log(e)
    }
}
});


notice.login(setting.token);