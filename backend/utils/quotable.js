const axios = require('axios');

async function getRandomQuote() {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content;
}

module.exports = { getRandomQuote };
