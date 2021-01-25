const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { NekoBot } = require("nekobot-api");
const api = new NekoBot;

module.exports = {
    name: 'changemymind',
    description: "Put your text in this meme template",
    usage: "\n<changemymind youtube ads are annoying",
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const text = args.splice(0).join(" ")

        const image = await api.generate('changemymind', { text: text })
        const msg = new MessageAttachment(image, 'changemymind.png')
        message.channel.send(msg)
    }
}