const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'happy-birthday',
    cooldown: 10000,
    description: "Wish someone happy birthday!",
    usage: "\n<happy-birthday #channel-name @username",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!channel) return message.channel.send('Please specify a channel')
        const user = args.slice(1).join(" ");

        if (!user) return message.channel.send('Please specify a user to wish hapi bdayyy.')

        channel.send(`Happy Birthday ${user}!`)
    }
}