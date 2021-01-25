const recon = require('reconlx');;
const Discord = require("discord.js");

module.exports = {
name: "transcript",
cooldown: 10000,
description: "Transcripts 5 messages and gives you a HTML file which looks bootiful",
usage: "",

async execute(client, message, args) {
    recon.fetchTranscript(message, 5)
    .then(data => {
        const file = new Discord.MessageAttachment(data, 'index.html');
        message.channel.send(file)
    })
    }
}