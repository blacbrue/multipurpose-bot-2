const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'trumptweet',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const messagefortweet = args.splice(0).join(" ");

        const image = await api.generate('trumptweet', { text: messagefortweet })
        const msg = new MessageAttachment(image, 'trumptweet.png')
        message.channel.send(msg)
    }
}