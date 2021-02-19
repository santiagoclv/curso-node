require("dotenv/config");
const axios = require("axios");

const api_key = process.env.NASA_API_KEY

async function getApodData(instance, params = {}) {
    // This is aweful but lateer in the cource I will fix it.
    try {
        const { data } = await instance.get("apod", {params}) ;
        return data;
    } catch (error) {
        console.error("ERROR: ", error.message)
        return null
    }
}

const instance = axios.create({
    baseURL: 'https://api.nasa.gov/planetary/',
    timeout: 5000,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    params: { api_key }
});

module.exports = {
    getApodData : getApodData.bind(this, instance)
}