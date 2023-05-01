# belly-button-diversity-analysis
The goal is to create an interactive dashboard that explores the Belly Button Biodiversity dataset.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
Using D3 library, I read in the dataset from the url: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json. The test subject ID no. dropdown menu allows the user to select an ID which returns the demographic information and charts for each individual.  Three charts were created to reflect the bacteria cultures and belly button washing frequency.  The bar chart displays the top ten bacteria cultures found for each individual.  The bubble charts displays the all the OTU levels for each individual and the gauge chart reflects the individual's washing frequency. 


## Technologies Used
- Javascript
- HTML
- CSS
- Plotly
- Bootstrap


## Screenshots
![1](https://user-images.githubusercontent.com/117790100/226712315-1a6f9d76-28f2-4d4c-990a-1ed42c4c7c4d.png)


## Setup
You can reference the dataset used in the data folder.


## Usage

```
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
function buildCharts(sampleValues) {
  d3.json(url).then(function (data) {
    var samples = data.samples;
    var metaData = data.metadata;
    console.log("Extracted Samples:", data.samples);
    console.log("Extracted MetaData:", data.metadata);

    // Filter by ID
    let resultArray = samples.filter(sampleObj => sampleObj.id == sampleValues);
    let result = resultArray[0];
    console.log("Samples:", result);

    let resultArray2 = metaData.filter(sampleObj => sampleObj.id == sampleValues);
    let result2 = resultArray2[0];
    console.log("MetaData:", result2);

    // Assign variables for the OTU IDs, OTU labels and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Check the values for each variable
    console.log("OTU IDs:", otu_ids, "OTU Labels:", otu_labels, "Sample_Values:", sample_values)

    // Set y ticks for top ten OTU 
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Check the values for yticks
    console.log("Yticks:", yticks)

    // Set data for bar chart
    let barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    // Set layout for bar chart
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    // Plot bar chart with barData and barLayout
    Plotly.newPlot("bar", barData, barLayout);

    // Set layout for bubble chart
    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    // Set data for bubble chart
    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    // Plot bubble chart with bubbleData and bubbleLayout
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    let gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result2.wfreq,
        title: { text: "<br><b>Belly Button Washing Frequency</b></br><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tickwidth: 0, tickcolor: "white" },
          bar: { color: "#006837" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "white",
          steps: [
            { range: [0, 1], color: "white" },
            { range: [1, 2], color: "#ffffbf" },
            { range: [2, 3], color: "#edf8b1" },
            { range: [3, 4], color: "#b2df8a" },
            { range: [4, 5], color: "#a6d96a" },
            { range: [5, 6], color: "#a1d76a" },
            { range: [6, 7], color: "#91cf60" },
            { range: [7, 8], color: "#7fbc41" },
            { range: [8, 9], color: "#4d9221" },
          ],
        }
      }
    ];

    let gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  })

};

```


## Project Status
Project is currently not being worked on.


## Room for Improvement
The gauge chart can be updated with more detailed features.

Room for improvement:
- Gauge Chart to reflect ranges and needle as indicator.


## Acknowledgements
- Many thanks to my instructional staff and tutor, David Chao.


## Contact
Created by Diane Guzman
