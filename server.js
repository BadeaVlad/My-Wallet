//const fetch = require('node-fetch');
//var Chart = require('chart.js');
/*var country;

  fetch('https://api.covid19api.com/live/country/italy/status/confirmed')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data[1] != undefined){
      console.log(data[1]);
      country = data[1].Active;
      document.getElementById("Actives").write(country);
    }
  }); 

fetch('https://api.covid19api.com/live/country/italy/status/confirmed')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data[1] != undefined){
      console.log(data[1].Country);
      country = data[1].Country;
      console.log(country);
    }
  });
var data

fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then((dati) => {
    data = dati;
    console.log(data.Global.TotalConfirmed);
 });

<script type="text/javascript">fetch('https://api.covid19api.com/live/country/italy/status/confirmed')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data[1] != undefined){
            console.log(data[1]);
            country = data[1].Active;
            document.write(country);
          }
        }); </script></h3>-->
*/

function GlobalStats(){
  var TotalConfirmed
  var TotalRecovered
  var TotalDeaths
  fetch('https://api.covid19api.com/summary')
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                if(data != undefined){
                  TotalConfirmed = data.Global.TotalConfirmed;
                  TotalRecovered = data.Global.TotalRecovered;
                  TotalDeaths = data.Global.TotalDeaths;
                  document.getElementById("Actives").textContent = TotalConfirmed;
                  document.getElementById("Recovered").textContent = TotalRecovered;
                  document.getElementById("Deaths").textContent = TotalDeaths;
                }
              });
};