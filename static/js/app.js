// Inside json we have three dictionaries: names, metadata, & samples
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard at start up
function init() {

    // Use D3 to select the dropdownmenu by using it's ID
    let dropdownMenu = d3.select("#selDataset");

    //Use D3 to get sample names and plot them in dropdownmenu selector
    d3.json(url).then((data) => {

        //setting sample names into names variable
        let names = data.names;

        names.forEach(id => {

            // log the value of id for each loop iteration 
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });

        // set the first default name from the names list
        let sample_one = names[0];

        // log the variable
        console.log(sample_one);

        //Build the initial plots
        getDemographicInfo(sample_one);
        drawBarChart(sample_one);
        drawBubbleChart(sample_one);

    });
};

// function definition to load metadata to demographic info
function getDemographicInfo(name){

    //retrieving the meta data for the selected name
    d3.json(url).then((data) => {

        //Retrieve all metadata
        let metadata = data.metadata;

        //filter based on id
        let value = metadata.filter(result => result.id == name);

        console.log(value)

        let valueData = value[0];
        d3.select("#sample-metadata").html("");
        
        Object.entries(valueData).forEach(([key,value]) => {

            //log the pair to console
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

//function definition for change event
function optionChanged(value){

    //log to the console
    console.log(value);

    //call all functions
    getDemographicInfo(value);
    drawBarChart(value);
    drawBubbleChart(value);
};

// Function defined to plot the bar chart
function drawBarChart(name) {

    //Use D3 to get all data 
    d3.json(url).then((data) => {

        //get all the sample data
        let sampleData = data.samples;

        //filter based on the values from sample data
        let value = sampleData.filter(result => result.id == name);

        //get first index of an array
        let index = value[0]

        //get the sample_values, otu_ids, & otu_labels 
        let sample_values = index.sample_values;
        let otu_ids = index.otu_ids;
        let otu_labels = index.sample_values;

        // log the retrieved data
        console.log(sample_values, otu_ids, otu_labels);

        //set top 10 items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //set up the trace for bar chart
        var trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: 'bar',
            orientation: "h"
        };

        var layout = {}; 
          
        //call plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

function drawBubbleChart(name) {

    //Use D3 to get all data 
    d3.json(url).then((data) => {

        //get all the sample data
        let sampleData = data.samples;

        //filter based on the values from sample data
        let value = sampleData.filter(result => result.id == name);

        //get first index of an array
        let index = value[0]

        //get the sample_values, otu_ids, & otu_labels 
        let sample_values = index.sample_values;
        let otu_ids = index.otu_ids;
        let otu_labels = index.sample_values;

        // log the retrieved data
        console.log(sample_values, otu_ids, otu_labels);

        //set up the trace for bar chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        var layout = {
            xaxis: {title: "OTU ID"}
        }; 
          
        //call plotly to plot the bar chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

init();

