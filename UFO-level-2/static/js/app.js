// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
var citySelection = d3.select("#city");
var stateSelection = d3.select("#state");
var countrySelection = d3.select("#country");
var shapeSelection = d3.select("#shape");
var filterButton = d3.select("#filter-btn");
var form = d3.select("#form");

// function takes a list and creates a table with it in the html page
function updateTable(selectedData){
    // clear any pre-existing rows
    tbody.selectAll('*').remove();
    
    selectedData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// function updates city drop down with city data from data set
function updateCitySelection() {
    // Create a blank option
    var option = citySelection.append("option");
    var cityList = [];
    option.text("");
    tableData.forEach((sighting) => {
        Object.entries(sighting).forEach(([key, value]) => {
            // find the city key, and check if city is not already added
            if (key == 'city' && cityList.indexOf(value) == -1) {
                cityList.push(value);
                var option = citySelection.append("option");
                option.value(value);
                option.text(value);
            }
        });
    });
}

// function updates state drop down with state data from data set
function updateStateSelection() {
    // Create a blank option
    var option = stateSelection.append("option");
    stateList = [];
    option.text("");
    tableData.forEach((sighting) => {
        Object.entries(sighting).forEach(([key, value]) => {
            // find the state key, and check if state is not already added
            if (key == 'state'  && stateList.indexOf(value) == -1) {
                stateList.push(value);
                var option = stateSelection.append("option");
                option.text(value);
            }
        });
    });
}

// function updates country drop down with country data from data set
function updateCountrySelection() {
    // Create a blank option
    var option = countrySelection.append("option");
    countryList = [];
    option.text("");
    tableData.forEach((sighting) => { 
        Object.entries(sighting).forEach(([key, value]) => {
            // find the country key, and check if country is not already added
            if (key == 'country' && countryList.indexOf(value) == -1) {
                countryList.push(value);
                var option = countrySelection.append("option");
                option.text(value);
            }
        });
    });
}

// function updates shape drop down with shape data from data set
function updateShapeSelection() {
    // Create a blank option
    var option = shapeSelection.append("option");
    shapeList = [];
    option.text("");
    tableData.forEach((sighting) => {    
        Object.entries(sighting).forEach(([key, value]) => {
            // find the shape key, and check if shape is not already added
            if (key == 'shape' && shapeList.indexOf(value) == -1) {
                shapeList.push(value);
                var option = shapeSelection.append("option");
                option.text(value);
            }
        });
    });
}

// create and populate the master data table
updateTable(tableData);
// create and populate the city drop-down selection
updateCitySelection();
// create and populate the state drop-down selection
updateStateSelection();
// create and populate the country drop-down selection
updateCountrySelection();
// create and populate the shape drop-down selection
updateShapeSelection();

filterButton.on('click', searchData);
form.on('submit', searchData);

function searchData() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // get the datetime element  
    var dateElement = d3.select("#datetime");
    // get the value the date input
    var dateValue = dateElement.property('value');
    // get user input for city
    var cityValue = d3.select('#city option:checked').text();
    // get user input for state
    var stateValue = d3.select('#state option:checked').text();
    // get user input for country
    var countryValue = d3.select('#country option:checked').text();
    // get user input for shape
    var shapeValue = d3.select('#shape option:checked').text();  

    var filteredData = data;

    if (dateValue.length > 0){
        filteredData = filteredData.filter(sighting => sighting.datetime == dateValue);
    }
    if (cityValue.length > 0) {
        filteredData = filteredData.filter(sighting => sighting.city == cityValue);
    }
    if (stateValue.length > 0) {
        filteredData = filteredData.filter(sighting => sighting.state == stateValue);
    }
    if (countryValue.length > 0) {
        filteredData = filteredData.filter(sighting => sighting.country == countryValue);
    }
    if (shapeValue.length > 0) {
        filteredData = filteredData.filter(sighting => sighting.shape == shapeValue);
    }
    updateTable(filteredData);
}