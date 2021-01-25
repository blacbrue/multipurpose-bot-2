const Discord = require('discord.js');
const fetch = require('node-fetch');
const got = require('got');

module.exports = {
    name: 'random',
    cooldown: 10000,
    aliases: ['r'],
    description: "Random stuff. See the usages above",
    usage: "\n<random cat\n<random dog\n<random date\n<random trivia\n<random math\n<random year\n<random meme\n<random aww\n<random food\n<random funny\n<random til",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply("Please use an arguement. Do <help random for more assistance")
        }
        else if (args.length === 1) {
            if (args[0] === "cat") {
                const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

                message.channel.send(file)
            }
            else if (args[0] === "dog") {
                const { url } = await fetch('https://random.dog/woof.json').then(response => response.json());

                message.channel.send(url)
            }
            else if (args[0] === "date") {
                const { text } = await fetch('http://numbersapi.com/random/date?json').then(response => response.json());

                message.channel.send(text)
            }
            else if (args[0] === "trivia") {
                const { text } = await fetch('http://numbersapi.com/random/trivia?json').then(response => response.json());

                message.channel.send("**Did you know**: " + text)
            }
            else if (args[0] === "math") {
                const { text } = await fetch('http://numbersapi.com/random/math?json').then(response => response.json());

                message.channel.send(text)
            }
            else if (args[0] === "year") {
                const { text } = await fetch('http://numbersapi.com/random/year?json').then(response => response.json());

                message.channel.send(text)
            }
            else if (args[0] === "meme") {
                got('https://reddit.com/r/memes/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage(content[0].data.children[0].data.url)
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    )
                })
            }
            else if (args[0] === "aww") {
                got('https://reddit.com/r/aww/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage(content[0].data.children[0].data.url)
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    )
                })
            }
            else if (args[0] === "food") {
                got('https://reddit.com/r/food/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage(content[0].data.children[0].data.url)
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    ).then(sentEmbed => {
                        sentEmbed.react("👍")
                        sentEmbed.react("➖")
                        sentEmbed.react("👎")
                    })
                })
            }
            else if (args[0] === "funny") {
                got('https://reddit.com/r/funny/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage(content[0].data.children[0].data.url)
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    )
                })
            }
            else if (args[0] === "askreddit") {
                got('https://reddit.com/r/askreddit/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage('https://cdn.discordapp.com/attachments/788275552137117717/795905878468984832/reminder_for_askreddit.png')
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    )
                })
            }
            else if (args[0] === "til") {
                got('https://reddit.com/r/todayilearned/random/.json').then(res => {
                    let content = JSON.parse(res.body)
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setURL('https://reddit.com' + content[0].data.children[0].data.permalink)
                            .setTitle(content[0].data.children[0].data.title)
                            .setImage(content[0].data.children[0].data.url)
                            .addField('Click on the title to see full post', 'Or click on the loading image and click "Open original" (if there is any)')
                            .setColor("RANDOM")
                            .setFooter(`👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`)
                    )
                })
            }
            else {
                return message.channel.send("> You have used a wrong arguement. Try cat, dog, date, trivia, math and year");
            }
        }
    }
}