const fetch = require("node-fetch");
var Chart = require('chart.js');


/*fetch('https://api.covid19api.com/live/country/italy/status/confirmed')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data[1] != undefined)
      console.log("lol");
  });*/
var country;
var data

fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then((dati) => {
    data = dati;
 });

