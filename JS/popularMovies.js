const axios = require("axios");

const axiosLookupOptions = {
    method: "GET",
    url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies',
    params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
    headers: {
        "X-RapidAPI-Key": "823db4503emshf275abc2acc566dp1874e1jsn2805dc79ab2f",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
    }
};

require("fs").writeFile("demo.txt", axios.request(axiosLookupOptions))
console.log("should've saved");