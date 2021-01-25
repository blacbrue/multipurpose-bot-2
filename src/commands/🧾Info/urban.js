const { Client, Message, MessageEmbed } = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
    name: 'urban',
    cooldown: 20000,
    description: "Search for definitions using the Urban Dictionary API. Sadly you can't search definitions with caps",
    usages: "\n<urban hello world",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
        }

        const query = querystring.stringify({ term: args.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        if (!list.length) {
            return message.reply(`No results found for **${args.join(' ')}**.`);
        }

        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        const [answer] = list;

        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} :thumbsup: ${answer.thumbs_down} :thumbsdown:` }
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))

        message.channel.send(embed);
    }
}