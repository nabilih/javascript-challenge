// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");
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
// initially load the provided dataset into a table
updateTable(tableData);

filterButton.on('click', searchData);
form.on('submit',searchData);

function searchData() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // get the datetime element  
    var dateElement = d3.select("#datetime");
    // get the value the user entered
    var dateValue = dateElement.property('value');
    console.log(dateValue);
    var filteredData = tableData.filter(sighting => sighting.datetime == dateValue);
    updateTable(filteredData);
}