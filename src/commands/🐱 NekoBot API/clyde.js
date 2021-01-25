const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'clyde-text',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const text = args.splice(0).join(" ")

        fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
        .then((res) => res.json())
        .then((body) => {
            let img = new MessageAttachment(body.message, 'clyde-text.png')
            message.channel.send(img)
        })
    }
}