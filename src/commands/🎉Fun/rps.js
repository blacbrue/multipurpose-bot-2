const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rps',
    aliases: ['rock-paper-scissors'],
    description: "ROCK PAPER SCISSORS with bot",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`How to play: m!rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return message.reply("It's a tie! We had the same choice.");
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('I won! I chose: ' + "**" + acceptedReplies[random] + "**");
                else return message.reply('You won! I chose: ' + "**" + acceptedReplies[random] + "**");
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('I won! I chose: ' + "**" + acceptedReplies[random] + "**");
                else return message.reply('You won! I chose: ' + "**" + acceptedReplies[random] + "**");    
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('I won! I chose: ' + "**" + acceptedReplies[random] + "**");
                else return message.reply('You won! I chose: ' + "**" + acceptedReplies[random] + "**");
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
}