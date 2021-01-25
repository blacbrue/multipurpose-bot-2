const { Client, Message, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    cooldown: 10000,
    usage: "\n<weather cheras",
    description: "Check the weather in your area!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send('Please specify a location')

            if (result === undefined || result.length === 0) return message.channel.send(':x: **Invalid** location');

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x111111)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', 'Celsius', true)
                .addField('Temperature', `${current.temperature}°`, true)
                .addField('Wind', current.winddisplay, true)
                .addField('Feels like', `${current.feelslike}°`, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setColor("RANDOM")



            message.channel.send(weatherinfo);
        })
    }
}