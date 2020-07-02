var namecountries = [];

function Countries(){
    getCountriesNameDropdown();
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
    fetch('https://api.covid19api.com/countries')
    .then((response) => {
        return response.json();
     })
    .then((data) => {
        //namecountries = data;
        for (i=0; data[i] != null; i++){
            namecountries[i] = data[i].Country;
        }
        namecountries.sort();
        for (a=0; a < namecountries.length; a++){
            var NewLi = CountriesListHeader.appendChild(document.createElement("li"));
            var NewA = NewLi.appendChild(document.createElement("a"));
            NewA.appendChild(document.createTextNode(namecountries[a]));
        }
        console.log(namecountries);
    })
}

function Search(){
    var input, filter, txtValue;
    var CountriesSearchList = document.getElementById("CountriesSearchList");
    input = document.getElementById("SearchBar");
    filter = input.value.toUpperCase();
    console.log(filter);
    for (i = 1; i < 249; i++){
        txtValue = namecountries[i - 1];
        txtValue = txtValue.toUpperCase();
        if (txtValue.startsWith(filter)){
            console.log(CountriesSearchList.childNodes[i].textContent);
            CountriesSearchList.childNodes[i].style.display = "";
        } else{
            CountriesSearchList.childNodes[i].style.display = "none";
        };

    }
}

function InitializeSearchBar(){
    var CountriesSearchList = document.getElementById("CountriesSearchList");
    for (a=0; a < namecountries.length; a++){
        var NewLi = CountriesSearchList.appendChild(document.createElement("li"));
        var NewA = NewLi.appendChild(document.createElement("a"));
        NewA.appendChild(document.createTextNode(namecountries[a]));
    }
    console.log(CountriesSearchList.childNodes);
    console.log(namecountries.length);
}