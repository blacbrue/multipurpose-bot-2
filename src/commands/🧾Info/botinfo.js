const { Client, Message, MessageEmbed } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');

module.exports = {
    name: 'botinfo',
    cooldown: 10000,
    aliases: ['botstats', 'stats', 'info'],
    description: "Shows the status/statistics of the bot. RAM, CPU, OS is Heroku's dynos.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { totalMemMb, usedMemMb } = await mem.info();

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Bot's status")
        .addFields(
            { name: "Memory (RAM)", value: `Total Memory (RAM): **${totalMemMb} MB**\nUsed Memory (RAM): **${usedMemMb} MB**`, inline: true },
            { name: "CPU", value: `CPU Usage: **${await cpu.usage()}** %\nCPU Model: **${cpu.model()}**\nCPU Cores: **${cpu.count()}**`, inline: true },
            { name: "OS (Operating System)", value: `OS: **${await os.oos()}**`, inline: true }
        )

        message.channel.send(embed)
    }
}