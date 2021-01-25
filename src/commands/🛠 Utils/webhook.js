const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'webhook',
    cooldown: 10000,
    usage: '\n<webhook test message\n<webhook @otheruser test message',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(message.author.id !== config.ownerID) return;
        const wc = new WebhookClient('801309171160580147', '5U8Gnk_CaXNttCpBWosFzUePApRO_cMFlOz3xEJvf17KHhdvfMB8Ni5Nugpq0orO3aok')
        const user = message.mentions.users.first() || message.author;

        wc.send(args.splice(1).join(" "), {
            username: user.tag,
            avatarURL: user.displayAvatarURL({ dynamic: true }),
        })
    }
}