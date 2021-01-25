const Discord = require('discord.js');
const moment = require('moment');
const ready = require('../../events/ready')

module.exports = {
    name: 'uptime',
    cooldown: 10000,
    usages: "\n<uptime milliseconds",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.author;

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const d = moment.duration(message.client.uptime);

        //script starts here
        if (!args.length) {
            console.log(d)
            message.channel.send(
                new Discord.MessageEmbed()
                .setTitle("Bot Uptime")
                .setColor('RANDOM')
                .setDescription("```" + uptime + "```")
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            )
        }
        else if (args.length === 1) {
            if (args[0] === "milliseconds") {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle("Bot Uptime")
                    .setColor('RANDOM')
                    .setDescription("```" + client.uptime + " milliseconds" + "```")
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                )
            }
            else if (args[0] === "ms") {
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle("Bot Uptime")
                    .setColor('RANDOM')
                    .setDescription("```" + client.uptime + " milliseconds" + "```")
                    .setTimestamp()
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                )
            }
        }
    }
}