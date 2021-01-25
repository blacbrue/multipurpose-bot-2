const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
  
module.exports = {
    name: 'eval',
    cooldown: 0,
    description: "evaluate and u cant use it",
    usage: "\n<eval ",
    aliases: ['evaluate'],
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        if(message.author.id !== config.ownerID) return message.reply("You are not allowed to use this command");

        if(message.author.id === config.ownerID) {
          if(!args[0]) return message.reply('please specify a script to evaluate')
            console.log('works with ' + message.author.tag)
            const clean = text => {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }

            try {
                const code = args.join(" ");
                let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
           
                // message.channel.send(clean(evaled), {code:"xl"});

                const embed = new MessageEmbed()
                .setTitle('Eval Success!')
                .setColor('RANDOM')
                .addFields(
                    { name: "Output", value: '```' + clean(evaled) + '```' }
                )
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                message.channel.send(embed)
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
    }
}