// Assign variable to url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create empty dictionary for data
x = {}

// Assign variable for selected element - Test Subject ID dropdown menu 
let selector = d3.select("#selDataset");

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  console.log("Data:", data);

  // Assign variable for data
  x = data;

  // Assign variable for test subject ID
  let sampleNames = data.names;
  // Display test subject ID
  console.log("Names:", sampleNames);

  // Iterate through test subject ID and append to selected element for drop down menu
  for (let i = 0; i < sampleNames.length; i++) {
    selector
      .append("option")
      .text(sampleNames[i])
      .property("value", sampleNames[i]);
  };

    // Call the functions to display the selected test subject ID's demographic info and plots
    buildMetadata(sampleNames[0]);
    buildCharts(sampleNames[0]);
  });

  // Create a function to extract the metadata for the demographic info table
function buildMetadata(sampleId) {
  d3.json(url).then(function (data) {
    var metaData = data.metadata;

    // Filter by ID
    let resultArray = metaData.filter(sampleObj => sampleObj.id == sampleId);
    console.log("Extracted MetaData:", resultArray);

    // Extract dictionary from array and assign to variable
    let result = resultArray[0];
    console.log("MetaData:", result)

    // Assign variable for selected element - Demographic Info Table
    let box = d3.select("#sample-metadata");

    // Clear the data in the table
    box.html("");

    // Iterate through the result variable and append each key to demographic info table
    for (key in result) {
      box.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };

  })
};

// Create a function called optionChanged for when new value is selected/clicked in dropdown menu
function optionChanged(sampleId) {
  // Call the functions to display the new value's demographic info and plots
  buildMetadata(sampleId);
  buildCharts(sampleId);
};

// Create a function to plot the bar and bubble charts 
function buildCharts(sampleValues)