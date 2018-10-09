var axios = require('axios');

const longmanEndpoint = "http://api.pearson.com/v2/dictionaries/entries";

function lookupWordPromisify(word) {
    console.log("seaching for ", word);
    return axios.get(longmanEndpoint, {
        params: {
            headword: word
        }
    });
}

module.exports = {
    lookupWordPromisify
};