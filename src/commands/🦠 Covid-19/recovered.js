const Discord = require('discord.js');
const axios = require("axios");

module.exports = {
    name: 'recovered',
    cooldown: 10000,
    description: "Shows the number of recoveries thanks to Covid",
    usage: "\n<recovered [today/td]\n<recovered [today/td] [country name]\n<recovered [yesterday/ytd]\n<recovered [yesterday/ytd] [country name]\n<recovered [historic/hs]\n<recovered [historic/hs] [number of days]\n<recovered [historic/hs] [number of days] [country name]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
         // Global recovered cases TOTAL
         if (!args.length) {
            let getTotalRecovered = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                return recovered = response.data;
            }
            let totalRecovered = await getTotalRecovered();

            const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Globally, ${numberWithCommas(totalRecovered["recovered"])} people have recovered from COVID-19.`)
                    .setFooter(`Last updated at ${new Date(totalRecovered["updated"]).toUTCString()}`);

            return message.channel.send(recoveredEmbed);
        }
        // Recoveries TODAY
        else if (args[0] === "today" || args[0] === "td"){
            // New global recoveries TODAY
            if (args.length == 1) {
                let getTodayRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayRecovered = await getTodayRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Today, ${numberWithCommas(todayRecovered["todayRecovered"])} people have recovered from COVID-19.`)
                    .setFooter(`Last updated at ${new Date(todayRecovered["updated"]).toUTCString()}`);
                
                return message.channel.send(recoveredEmbed);
            }
            // Country-specific recoveries TODAY
            else if (args.length >= 2){
                let country = args.slice(1).join(" ");

                let getTodayRecoveredCountry = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return data = response.data;
                }
                let todayRecoveredCountry = await getTodayRecoveredCountry();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Today, ${numberWithCommas(todayRecoveredCountry["todayRecovered"])} people have recovered from COVID-19 in ${todayRecoveredCountry["country"]}.`)
                    .setFooter(`Last updated at ${new Date(todayRecoveredCountry["updated"]).toUTCString()}`);

                return message.channel.send(recoveredEmbed);
            }
        }
        // Recoveries YESTERDAY
        else if (args[0] === "yesterday" || args[0] === "ytd") {
            // Global recovered cases YESTERDAY
            if (args.length == 1) {
                let getYTDRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return data = response.data;
                }
                let totalYTDRecovered = await getYTDRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Yesterday, ${numberWithCommas(totalYTDRecovered["todayRecovered"])} people recovered from COVID-19.`)
                    .setFooter(`Last updated at ${new Date(totalYTDRecovered["updated"]).toUTCString()}`);

                return message.channel.send(recoveredEmbed);
            }
            // Country-specific recovered cases YESTERDAY
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getYTDCountryRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Please enter a valid country.`)
                        }
                    });
                    return data = response.data;
                }
                let totalYTDCountryRecovered = await getYTDCountryRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Yesterday, ${numberWithCommas(totalYTDCountryRecovered["todayRecovered"])} people recovered from COVID-19 in ${totalYTDCountryRecovered["country"]}.`)
                    .setFooter(`Last updated at ${new Date(totalYTDCountryRecovered["updated"]).toUTCString()}`);

                return message.channel.send(recoveredEmbed);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Invalid arguments. Please type <help for help with commands.`);
            }
        }
        // HISTORIC Recoveries (Sends a graph)
        else if (args[0] === "historic" || args[0] === "hs") {
            // No specified number of days (defaulted to 30)
            if (args.length == 1) {
                let xAxisLabels = [];
                let recoveryData = [];

                let getHistoricRecoveries = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return data = response.data;
                }
                let historicRecoveries = await getHistoricRecoveries();
                // Format x-axis labels and compile data to be used on graph
                for (day in historicRecoveries["recovered"]){
                    xAxisLabels.push("\"" + day + "\"");
                    recoveryData.push((historicRecoveries["recovered"][`${day}`]));
                }
                // Create a new embedded message for the bot to display the historic recoveries
                const historicRecoveriesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle("COVID-19 Recoveries for the Past 30 Days Globally")
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${recoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicRecoveriesEmbed);
            }
            // Global recoveries historically for a specified number of days
            else if (args.length == 2 && typeof(parseFloat(args[1])) === 'number') {
                let numDays = args[1];

                // Input validation - the number of days must be an integer between 2 and 100, inclusive
                if (!Number.isInteger(parseFloat(numDays)))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100)
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2)
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {
                    let dayRecoveryData = [];
                    let xAxisLabels = [];

                    let getDayHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - error`)
                            }
                        });
                        return data = response.data;
                    }
                    let historicDayRecoveries = await getDayHistoricRecoveries();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicDayRecoveries["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayRecoveryData.push(historicDayRecoveries["recovered"][`${day}`])
                    }
                    // Create a new embedded message for the bot to display the Country-specific historic recoveries
                    const historicRecoveredEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Deaths for the Past ${numDays} Days Globally`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${dayRecoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicRecoveredEmbed);
                }
            }
            // Country specific historic recoveries for certain days
            else if (args.length >= 3 && typeof(parseFloat(args[1]) === 'number') && /^[a-zA-Z\s]*$/i.test(args.slice(2).join(" "))) {
                let countryName = args.slice(2).join(" ");
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)) && !isNaN(numDays))
                    return message.channel.send(`<@${message.author.id}> - Number of days must be a valid integer.`);
                else if (numDays > 100) 
                    return message.channel.send(`<@${message.author.id}> - I can only display data from up to the past 100 days.`);
                else if (numDays < 2) 
                    return message.channel.send(`<@${message.author.id}> - The number of days specified must be at least 2.`);
                else {
                    let countryRecoveryData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                return message.channel.send(`<@${message.author.id}> - Please enter a valid country.`);
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryRecoveries = await getCountryHistoricRecoveries();
                    // Format x-axis labels and compile data to be used on graph
                    for (day in historicCountryRecoveries["timeline"]["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryRecoveryData.push(historicCountryRecoveries["timeline"]["recovered"][`${day}`])
                    }        
                    // Create a new embedded message for the bot to display the Country-specific historic deaths
                    const historicRecoveriesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTitle(`Historic Recoveries for the Past ${numDays} Days in ${historicCountryRecoveries["country"]}`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${countryRecoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)
    
                    return message.channel.send(historicRecoveriesEmbed);
                }                
            } else 
                return message.channel.send(`<@${message.author.id}> - Command syntax is ` + "```" + "<recovered [historic/hs] [number of days] [name of country]" + "```");
        } else 
            return message.channel.send(`<@${message.author.id}> - Please enter a valid argument. Type <help for help with commands.`);
    }
}
// Helper function that adds commas to large numbers using REGEX
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}