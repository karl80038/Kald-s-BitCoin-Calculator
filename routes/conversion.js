const express = require('express');
const path = require('path');
const rootDirectory = require('../utilities/path');
const axios = require('axios');
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));


router.get('/', function(req, res) {
    res.render('conversionRequest', {
        pageTitle: "BitCoin Calculator",
        pageInfo: "Use this page to convert either U.S Dollars or Euros to BitCoins.",
        valueTitle: "Value:",
        currencyTitle: "Currency:",
        submitCaption: "Convert!",
        path: "/"
    });
});

router.post('/', function(req, res) {
    //let currency = req.body.currency;
    let value = req.body.value; 
    let currency = req.body.currency;
    let API_URL = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    let rate;
    let conversion;
    let bitcoinrate;
    console.log(req.body.currency);
    
    axios.get(`https://api.coindesk.com/v1/bpi/currentprice/XBT.json`)
    .then(function (response) {
    // handle success
    bitcoinrate = response.data.bpi.XBT.rate_float;    
    console.log(`BitCoin rate is: ${bitcoinrate}`);
   
    })

    .catch(function (error) {
    // handle error
    console.log(error);
    })

    .finally(function () {
    // always executed

    });

    axios.get(API_URL)
    .then(function (response) {
    // handle success
    console.log(response);

    if (currency === "EUR" )
    {
        rate =  response.data.bpi.EUR.rate_float;
        conversion = value * rate;
        console.log(`EUR exchange rate is: ${rate}`);
        console.log(`${value} Bitcoins equals ${conversion} Euros`);
    }
    else if (currency === "USD")
    {
        rate = response.data.bpi.USD.rate_float;
        conversion = value * rate
        console.log(`USD exchange rate is: ${rate}`);
        console.log(`${value} Bitcoins equals ${conversion} U.S Dollars`);
    }
    })

    .catch(function (error) {
    // handle error
    console.log(error);
    })

    .finally(function () {
    // always executed
    res.render('conversionResponse', {
        
        pageTitle: "BitCoin Calculator - Response Page",
        pageInfo: "Use this page to convert either U.S Dollars or Euros to BitCoins.",
        bitVal : value,
        bitCurrentRate : bitcoinrate,
        selCurrency : currency,
        selCurrRate : rate,
        selCurrVal : conversion,
        path: "/conversionResponse"
    });

    });
})

exports.Router = router;