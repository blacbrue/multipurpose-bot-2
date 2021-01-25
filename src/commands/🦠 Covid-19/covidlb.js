const Discord = require('discord.js');
const axios = require("axios"); 

module.exports = {
    name: 'covidlb',
    cooldown: 10000,
    description: 'Shows the Top 10 Countries in Cases, Recoveries and Deaths in this stupid pandemic (Covid 19)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args.length){
            let leadingDeaths = [];
            let leadingRecoveries = [];
            let leadingCases = [];

            let getCovData = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort");
                let data = response.data;
                return data;
            }
            let countryData = await getCovData();
            // console.log(countryData);

            // Only take the top ~20 countries data for each comparison
            for (country in countryData){
                if (countryData[country]["deaths"] > 5000) leadingDeaths.push(countryData[country]);
                if (countryData[country]["recovered"] > 80000) leadingRecoveries.push(countryData[country]);
                if (countryData[country]["cases"] > 150000) leadingCases.push(countryData[country]);
            }
            // Sort the arrays
            leadingDeaths.sort(compareDeaths);
            leadingRecoveries.sort(compareRecovered);
            leadingCases.sort(compareCases);

            // Create the formatted embedded message
            const leadingEmbed = new Discord.MessageEmbed()
                .setColor("#990000")
                .setTitle("Global COVID-19 Stats")
                .addField("Most Cases", formatData(leadingCases, "cases"), true)
                .addField("Most Deaths", formatData(leadingDeaths, "deaths"), true)
                .addField("Most Recoveries", formatData(leadingRecoveries, "recovered"), true)
                .setFooter(`Last updated at ${new Date(countryData[115]["updated"]).toUTCString()}`);

            return message.channel.send(leadingEmbed);
        }
    }
}
// Compile each value line shown in the Field
let formatData = (arr, typeStr) => {
    let msg = ``;

    for (let countryNum = 0; countryNum < 10; countryNum++){
        msg += `${countryNum + 1}: ${arr[countryNum]["country"]} :flag_${arr[countryNum]["countryInfo"]["iso2"].toLowerCase()}::  ${numberWithCommas(arr[countryNum][typeStr])} \n`
    }
    return msg;
} 

let compareDeaths = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["deaths"]
    const countryB = b["deaths"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareRecovered= (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["recovered"]
    const countryB = b["recovered"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareCases = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const countryA = a["cases"]
    const countryB = b["cases"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}  

// Helper function that adds commas to large numbers using REGEX
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}