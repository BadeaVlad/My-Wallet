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
function Italy(){
  fetch('https://api.covid19api.com/dayone/country/romania')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
}

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
        NewConfirmed = data.Global.NewConfirmed;
        NewRecovered = data.Global.NewRecovered
        NewDeaths = data.Global.NewDeaths;
        TotalConfirmed = data.Global.TotalConfirmed;
        TotalRecovered = data.Global.TotalRecovered;
        TotalDeaths = data.Global.TotalDeaths;
        document.getElementById("NewActives").textContent = NewConfirmed;
        document.getElementById("Actives").textContent = TotalConfirmed;
        document.getElementById("NewRecovered").textContent = NewRecovered;
        document.getElementById("Recovered").textContent = TotalRecovered;
        document.getElementById("NewDeaths").textContent = NewDeaths;
        document.getElementById("Deaths").textContent = TotalDeaths;
      }

    });
  currentTime();
};

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
    var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

//currentTime();
/*
<ul class="uk-navbar-nav">
        <li class="uk-active">
          <a id="clock"></a>
        </li>
      </ul>

*/