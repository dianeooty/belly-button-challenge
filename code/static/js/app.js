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

});