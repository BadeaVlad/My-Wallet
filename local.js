let fs = require('fs');

function localstorage(){
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
            }
            var json = JSON.stringify(data.Global);
            fs.writeFile('data.json', json, function(err){
                if (err) throw err;
                console.log('Replaced!');
            });
        });
}