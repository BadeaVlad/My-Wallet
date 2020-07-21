var startdate = "2020-05-22";
var array = [];
var ConfirmedIndex = 1;
var RecoverdIndex = 0;
var DeathsIndex = 0;
//AIzaSyCgLIrQEjs4UWdVfndqOoI4abcSId9hLZ0

function drawChart(){
  var finishdate = new Date();
  finishdate = finishdate.getFullYear() + "-" + finishdate.getMonth() + "-" + finishdate.getDate();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Country');
  data.addColumn('number', 'Cases');
  if (ConfirmedIndex == 1){
    fetch('https://api.covid19api.com/summary')
    .then((response) => {
      return response.json();
    })
    .then((dati) => {
      /*for (i = 0; i < dati.length; i++){
        array[i] = dati[i].TotalConfirmed;
      }
      array.sort();*/
      console.log(dati.Countries);
      for(i = 0; i < dati.Countries.length; i++){
        data.addRows([
          [dati.Countries[i].CountryCode, dati.Countries[i].TotalConfirmed]
        ])
      }
      var options = {};
      var chart = new google.visualization.GeoChart(document.getElementById("Map_chart"));

      chart.draw(data, options);
    })
  } else if (RecoverdIndex == 1){
    fetch('https://api.covid19api.com/summary')
    .then((response) => {
      return response.json();
    })
    .then((dati) => {
      /*for (i = 0; i < dati.length; i++){
        array[i] = dati[i].TotalConfirmed;
      }
      array.sort();*/
      console.log(dati.Countries);
      for(i = 0; i < dati.Countries.length; i++){
        data.addRows([
          [dati.Countries[i].CountryCode, dati.Countries[i].TotalRecovered]
        ])
      }
      var options = {};
      var chart = new google.visualization.GeoChart(document.getElementById("Map_chart"));

      chart.draw(data, options);
    })
  } else {
    fetch('https://api.covid19api.com/summary')
    .then((response) => {
      return response.json();
    })
    .then((dati) => {
      /*for (i = 0; i < dati.length; i++){
        array[i] = dati[i].TotalConfirmed;
      }
      array.sort();*/
      console.log(dati.Countries);
      for(i = 0; i < dati.Countries.length; i++){
        data.addRows([
          [dati.Countries[i].CountryCode, dati.Countries[i].TotalDeaths]
        ])
      }
      var options = {};
      var chart = new google.visualization.GeoChart(document.getElementById("Map_chart"));

      chart.draw(data, options);
    })
  }
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
      } else{
        console.log("some prob");
      }

    });
  currentTime();
  drawChart();
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

function ConfirmedTab(){
  ConfirmedIndex = 1;
  RecoverdIndex = 0;
  DeathsIndex = 0;
  drawChart();
}

function RecoveredTab(){
  ConfirmedIndex = 0;
  RecoverdIndex = 1;
  DeathsIndex = 0;
  drawChart();
}

function DeathsTab(){
  ConfirmedIndex = 0;
  RecoverdIndex = 0;
  DeathsIndex = 1;
  drawChart();
}

//currentTime();
/*
<ul class="uk-navbar-nav">
        <li class="uk-active">
          <a id="clock"></a>
        </li>
      </ul>

*/