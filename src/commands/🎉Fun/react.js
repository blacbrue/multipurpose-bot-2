const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'react',
    cooldown: 10000,
    description: "The bot reacts to your message",
    usage: "\n<react :wave:",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.reply("You did not provide any arguements");

            message.react(args[0]);
        }
        catch (err) {
            message.channel.send(err.message)
        }
    }
}