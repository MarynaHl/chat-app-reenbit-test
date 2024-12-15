const axios = require('axios');

async function getRandomQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/random', {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });
        return response.data.content;
    } catch (err) {
        console.error('Error fetching quote:', err.message);
        return 'Default quote due to SSL error.';
    }
}

module.exports = { getRandomQuote };
