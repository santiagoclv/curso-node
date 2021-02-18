require("dotenv/config");
const axios = require("axios");
// native http lib from node
const https = require("https");

const api_key = "DEMO_KEY" // process.env.NASA_API_KEY

https.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`, (res) => {
    let data = '';
    res.on('data', (d) => {
        data += d;
    });

    res.on('close', (d) => {
        console.log( {data : JSON.parse(data)} )
    });

}).on('error', (e) => {
    console.error(e);
});

async function getApod(instance) {
    try {
        const response = await instance.get("apod");
        return response.data;
    } catch (error) {
        console.error("ERROR: ", error.message)
        return null
    }
}

const instance = axios.create({
    baseURL: 'https://api.nasa.gov/planetary/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' },
    params: { api_key }
});

getApod(instance);