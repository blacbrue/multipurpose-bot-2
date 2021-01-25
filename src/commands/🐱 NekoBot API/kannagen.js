const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'kannagen',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const text = args.splice(0).join(" ")

        const image = await api.generate('kannagen', { text: text })
        const msg = new MessageAttachment(image, 'kannagenned.png')
        message.channel.send(msg)
    }
}