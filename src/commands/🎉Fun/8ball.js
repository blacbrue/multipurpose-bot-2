const { Client, Message, MessageEmbed } = require('discord.js');
const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it",
    "yes",
    "Most Likely",
    "Outlook good",
    "Yes",
    "Signs point to yes"
];

module.exports = {
    name: '8ball',
    usage: '\m<8ball am I fat?',
    cooldown: 10000,
    description: "The magical 8 ball answers your very mysterious questions.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[2]) return message.reply('Please ask a full question')
        
        const result = Math.floor((Math.random() * responses.length));
        const question = args.join(" ");

        const embed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setColor('RANDOM')
        .addField("Question", question)
        .addField("Answer", responses[result]);

        message.channel.send(embed)
    }
}