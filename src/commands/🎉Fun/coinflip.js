const { Client, Message, MessageEmbed } = require('discord.js');

const possibleResults = ["Heads", "Tails"];

module.exports = {
    name: 'coinflip',
    cooldown: 10000,
    description: 'Flips a coin.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const msg = await message.channel.send('Flipping a coin :coin:')
        const output = possibleResults[Math.floor(Math.random() * possibleResults.length)];

        message.reply(`you flipped a coin and you got **${output}!!!**`)
        msg.delete();
    }
}