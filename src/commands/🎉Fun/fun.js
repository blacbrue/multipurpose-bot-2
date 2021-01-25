const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fun',
    cooldown: 10000,
    description: "Fun commands in Fun category lol this is a bruh moment wshfsdif",
    usage: "\n<fun penguin\n<fun ping",
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async (client, message, args) => {
        const user = message.author;

        if (!args.length) {
            message.channel.send(`${user}, do <fun [arguement] to actually use this command. Available arguements: ``<fun penguin``, ``<fun ping!```)
        }
        else if (args.length === 1) {
            if (args[0] === "penguin") {
                const pimg = [
                    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2017%2F01%2Fpenguins.jpg",
                    "https://www.lovethesepics.com/wp-content/uploads/2012/12/Emperor-Penguin-Chick-Snow-Hill-Island-Antarctica.jpg",
                    "https://i.ytimg.com/vi/2ME6MZ83iPY/maxresdefault.jpg",
                    "https://media.glamour.com/photos/56959e35d9dab9ff41b308a0/master/pass/inspired-2015-02-gentoo-penguin-main.jpg",
                    "https://i2-prod.mirror.co.uk/incoming/article7262984.ece/ALTERNATES/s1200c/Pay-penguins_0712.jpg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jtTHlm481n2O84eBPgT1tT4jgE36UbeZ_w&usqp=CAU",
                    "https://i.pinimg.com/originals/db/c4/f9/dbc4f965cb92e4c5706053314ea2d861.jpg",
                    "https://static.boredpanda.com/blog/wp-content/uploads/2020/02/penguin-comics-niwazekisho-fb-png__700.jpg",
                    "https://www.rd.com/wp-content/uploads/2018/03/emperor-penguins-760x506.jpg",
                    "https://i.pinimg.com/originals/40/10/8d/40108db0a856473634e5ce30771e1ee2.jpg",
                    "https://pics.me.me/this-cute-baby-penguin-3-57674178.png",
                    "http://static.demilked.com/wp-content/uploads/2020/02/5e45080c5cd32-929337605199556608.png",
                    "http://static.demilked.com/wp-content/uploads/2020/02/5e45080cd827c-penguin-comics-niwazekisho-1137-5e44138301027__700.jpg",
                    "http://static.demilked.com/wp-content/uploads/2020/02/5e45080d1e325-1147460809980665856-png__700.jpg",
                    "http://static.demilked.com/wp-content/uploads/2020/02/5e45080d3c4b3-penguin-comics-niwazekisho-5e43b52d4dfdc__700.jpg",
                    "http://static.demilked.com/wp-content/uploads/2020/02/5e45080d5a4da-penguin-comics-niwazekisho-5e43a6b3974f2__700.jpg",
                    "Need more penguin pics? Contact <@398752205043400724> for add more!"
                ]

                const randomPimg = pimg[Math.floor(Math.random() * (pimg.length - 1) + 1)];

                message.channel.send(randomPimg)
            }
            else if (args[0] === "ping!") {
                message.channel.send("Pong!")
            }
            else {
                message.channel.send(`${user}, you have given a wrong arguement. Try <fun joke, <fun penguin, <fun ping!.`)
            }
        }
    }
}