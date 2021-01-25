const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'badges',
    cooldown: 10000,
    description: "Display badges of the user",
    usage: "\n<badges @username",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        console.log(flags);
        
        message.channel.send(`${user}'s badges: ``${flags.join(', ')}```)
    }
}