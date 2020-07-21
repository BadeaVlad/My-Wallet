
var CountryTotalConfirmed = document.getElementById("TotalConfirmed");
var CountryTitle = document.getElementById("CountryTitle");
var CountriesListHeader = document.getElementById("CountriesListHeader");
var CountriesSearchList = document.getElementById("CountriesSearchList");
var selectedcountry = "Italy";
var namecountries = [];
var secondnamecountries = [];
var codecountries = [];
var cal = [];
var startdate = "2020-01-22";
var gg = [];

function Countries(){
    var CountryTitle = document.getElementById("CountryTitle");
    CountryTitle.textContent = selectedcountry;
    CountrySelectedStats();
    getCountriesNameDropdown();
    getCode();
    //TestCountriesPopulation();
    currentTime();
}

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

function getCountriesNameDropdown(){
    var CountriesListHeader = document.getElementById("CountriesListHeader");
    var CountriesSearchList = document.getElementById("CountriesSearchList");
    fetch('https://api.covid19api.com/countries')
    .then((response) => {
        return response.json();
     })
    .then((data) => {
        for (i=0; data[i] != null; i++){
            namecountries[i] = data[i].Country;
            gg[i] = data[i].Country + ';' + data[i].ISO2;
        }
        namecountries.sort();
        for (i = 0; i < gg.length; i++){
            secondnamecountries[i] = gg[i].split(';');
        }
        secondnamecountries.sort();
        for (a=0; a < namecountries.length; a++){
            var LiCountriesList = CountriesListHeader.appendChild(document.createElement("li"));
            var ACountriesList = LiCountriesList.appendChild(document.createElement("a"));
            var LiSearchBar = CountriesSearchList.appendChild(document.createElement("li"));
            var ASearchBar = LiSearchBar.appendChild(document.createElement("a"));
            ACountriesList.appendChild(document.createTextNode(namecountries[a]));
            ACountriesList.setAttribute('onclick', 'CountrySelection()');
            ACountriesList.onclick = function(){
                CountrySelection();
                //CountryCode.textContent = secondnamecountries[a][1];
            }
            ASearchBar.appendChild(document.createTextNode(namecountries[a]));
            ASearchBar.setAttribute('onclick', 'CountrySelection()');
            ASearchBar.onclick = function(){
                CountrySelection();
                //CountryCode.textContent = secondnamecountries[a][1];
            }
        }
    })
}

function Search(){
    var CountriesSearchList = document.getElementById("CountriesSearchList");
    var input, filter, txtValue;
    input = document.getElementById("SearchBar");
    filter = input.value.toUpperCase();
    for (i = 1; i < 249; i++){
        txtValue = namecountries[i - 1];
        txtValue = txtValue.toUpperCase();
        if (txtValue.startsWith(filter)){
            CountriesSearchList.childNodes[i].style.display = "";
        } else{
            CountriesSearchList.childNodes[i].style.display = "none";
        };

    }
}

function CountrySelection(){
    var CountryTitle = document.getElementById("CountryTitle");
    CountryTitle.textContent = document.getSelection().focusNode.textContent;
    selectedcountry = CountryTitle.textContent;
    CountrySelectedStats();
    getCode();
    drawChart();
    drawPie();
}

function CountrySelectedStats(){
    CountryTotalConfirmed = document.getElementById("TotalConfirmed");
    CountryNewConfirmed = document.getElementById("NewConfirmed");
    CountryTotalRecovered = document.getElementById("TotalRecovered");
    CountryNewRecovered = document.getElementById("NewRecovered");
    CountryTotalDeaths = document.getElementById("TotalDeaths");
    CountryNewDeaths = document.getElementById("NewDeaths");
    fetch('https://api.covid19api.com/summary')
    .then((response) => {
        return response.json();
     })
    .then((data) => {
        for (i = 0; i < data.Countries.length; i++){
            if(data.Countries[i].Country.localeCompare(selectedcountry) == 0){
                console.log(data.Countries[i]);
                CountryTotalConfirmed.textContent = data.Countries[i].TotalConfirmed;
                CountryNewConfirmed.textContent = data.Countries[i].NewConfirmed;
                CountryTotalRecovered.textContent = data.Countries[i].TotalRecovered;
                CountryNewRecovered.textContent = data.Countries[i].NewRecovered;
                CountryTotalDeaths.textContent = data.Countries[i].TotalDeaths;
                CountryNewDeaths.textContent = data.Countries[i].NewDeaths;
                return;
            } else {
                CountryTotalConfirmed.textContent = "0";
                CountryTotalRecovered.textContent = "0";
                CountryTotalDeaths.textContent = "0";
            }
        }
    })
}
function drawChart(){
    var finishdate = new Date();
    finishdate = finishdate.getFullYear() + "-" + finishdate.getMonth() + "-" + finishdate.getDate();
    CountryTotalConfirmed = document.getElementById("TotalConfirmed");
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Confirmed');
    data.addColumn('number', 'Recovered');
    data.addColumn('number', 'Deaths');
    fetch('https://api.covid19api.com/country/' + selectedcountry.toLowerCase() + '/status/confirmed/live?from=' + startdate + 'T00:00:00Z&to=' + finishdate + 'T00:00:00Z')
    .then((response) => {
            return response.json();
    })
    .then((data_confirmed) => {
        fetch('https://api.covid19api.com/country/' + selectedcountry.toLowerCase() + '/status/recovered/live?from=' + startdate + 'T00:00:00Z&to=' + finishdate + 'T00:00:00Z')
        .then((response) => {
                return response.json();
        })
        .then((data_recovered) =>{
            fetch('https://api.covid19api.com/country/' + selectedcountry.toLowerCase() + '/status/deaths/live?from=' + startdate + 'T00:00:00Z&to=' + finishdate + 'T00:00:00Z')
            .then((response) => {
                return response.json();
            })
            .then((data_deaths) => {
                if (data_confirmed.length > 0){
                    for (i = 0; i < data_confirmed.length; i++){
                        cal[i] = data_confirmed[i].Date.split("T");
                    }
                } else if (data_recovered.length > 0){
                    for (i = 0; i < data_recovered.length; i++){
                        cal[i] = data_recovered[i].Date.split("T");
                    }
                } else if (data_deaths > 0){
                    for (i = 0; i < data_deaths.length; i++){
                        cal[i] = data_deaths[i].Date.split("T");
                    }
                } else {

                }
                if (cal.length == 0){
                    data.addRows([
                        ['0', 0, 0, 0],
                        ['0', 0, 0, 0]
                    ]);
                }
                for (i = 0; i < cal.length; i++){
                    if (CountryTotalConfirmed.textContent == "0" && CountryTotalRecovered.textContent == "0" && CountryTotalDeaths.textContent == "0"){
                        data.addRows([
                            [cal[i][0], 0, 0, 0]
                        ]);
                    } else if (CountryTotalConfirmed.textContent == "0" && CountryTotalRecovered.textContent == "0"){
                        data.addRows([
                            [cal[i][0], 0, 0, data_deaths[i].Cases]
                        ]);
                    } else if (CountryTotalConfirmed.textContent == "0" && CountryTotalDeaths.textContent == "0"){
                        data.addRows([
                            [cal[i][0], 0, data_recovered[i].Cases, 0]
                        ]);
                    } else if (CountryTotalRecovered.textContent == "0" && CountryTotalDeaths.textContent == "0"){
                        data.addRows([
                            [cal[i][0], data_confirmed[i].Cases, 0, 0]
                        ]);
                    } else if (CountryTotalConfirmed.textContent == "0"){
                        data.addRows([
                            [cal[i][0], 0, data_recovered[i].Cases, data_deaths[i].Cases]
                        ]);
                    } else if (CountryTotalRecovered.textContent == "0"){
                        data.addRows([
                            [cal[i][0], data_confirmed[i].Cases, 0, data_deaths[i].Cases]
                        ]);
                    } else if (CountryTotalDeaths.textContent == "0"){
                        data.addRows([
                            [cal[i][0], data_confirmed[i].Cases, data_recovered[i].Cases, 0]
                        ]);
                    } else {
                        data.addRows([
                            [cal[i][0], data_confirmed[i].Cases, data_recovered[i].Cases, data_deaths[i].Cases]
                        ]);
                    }  
                }
                var options = {
                    width: 900,
                    height: 500
                };
                var chart = new google.visualization.LineChart(document.getElementById("line_chart"));
            
                chart.draw(data, options);
            })
        })
    })
}

function drawPie(){
    var CountryTitle = document.getElementById("CountryTitle");
    var CountryCode = document.getElementById("CountryCode");
    CountryTotalConfirmed = document.getElementById("TotalConfirmed");
    CountryTotalRecovered = document.getElementById("TotalRecovered");
    CountryTotalDeaths = document.getElementById("TotalDeaths");
    var Country;
    fetch('https://world-population.p.rapidapi.com/allcountriesname', {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": "bba744a922msh2bb7eb305cc71a6p1f20cajsn8e2f93e33e24"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data_countries) => {
            for (i = 0; i < data_countries.body.countries.length; i++){
                if (CountryTitle.textContent == data_countries.body.countries[i] || CountryTitle.textContent.includes(data_countries.body.countries[i]) == true){
                    Country = data_countries.body.countries[i];
                } else {
                    
                }
            }
    fetch("https://countries-cities.p.rapidapi.com/location/country/" + CountryCode.textContent + "?format=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "countries-cities.p.rapidapi.com",
            "x-rapidapi-key": "bba744a922msh2bb7eb305cc71a6p1f20cajsn8e2f93e33e24"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data_population) => {
            population = data_population.population;
            alive = population - CountryTotalConfirmed.textContent;
            alive = alive - CountryTotalRecovered.textContent;
            alive = alive - CountryTotalDeaths.textContent;
            var data = google.visualization.arrayToDataTable([
                ['Task', 'Total Population'],
                ['Healthy', alive],
                ['Confirmed', parseInt(CountryTotalConfirmed.textContent, 10)],
                ['Recovered', parseInt(CountryTotalRecovered.textContent, 10)],
                ['Deaths', parseInt(CountryTotalDeaths.textContent, 10)]
            ]);
            var options = {
                title: 'Total Population',
            pieHole: 0.4,
            };
            var chart = new google.visualization.PieChart(document.getElementById("pie_chart"));
        
            chart.draw(data, options);
        })
    })
}

/*
if(response == undefined){
            console.log("gg");
        } else{
            return response.json();
        }


for (i = 0; i < data_confirmed.length; i++){
    cal[i] = data_confirmed[i].Date.split("T");
}

for (i = 0; i < cal.length; i++){
    if (CountryTotalConfirmed.textContent == "0"){
        console.log("lol");
        data.addRows([
            [cal[i][0], 0]
        ]);
    } else {
        data.addRows([
            [cal[i][0], data_confirmed[i].Cases]
        ]);
    }  
}*/

function getCode(){
    var CountryTitle = document.getElementById("CountryTitle");
    var CountryCode = document.getElementById("CountryCode");
    fetch('https://api.covid19api.com/countries')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for ( i = 0; i < data.length; i++){
            if (CountryTitle.textContent == data[i].Country){
                CountryCode.textContent = data[i].ISO2;
            } else {

            }
        }
    })
}

function TestCountriesPopulation(){
    fetch('https://api.covid19api.com/countries')
    .then((response) => {
        return response.json();
    })
    .then((code_country) => {
        for (i = 0; i < code_country.length; i++){
            fetch("https://countries-cities.p.rapidapi.com/location/country/" + code_country[i].ISO2 + "?format=json", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "countries-cities.p.rapidapi.com",
                    "x-rapidapi-key": "bba744a922msh2bb7eb305cc71a6p1f20cajsn8e2f93e33e24"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((country_population) => {
                console.log(country_population.name + ' ' + country_population.population);
            })
        }   
    })
}