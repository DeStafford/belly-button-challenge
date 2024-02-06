d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard at start up
function init() {

    // Use D3 to select the dropdownmenu by using it's ID
    let dropdown = d3.select("#selDataset");

    //Use D3 to get sample names and plot them in dropdownmenu selector
    d3.json(url).then((data) => {

        //setting sample names into names variable
        let names = data.names;

        names.forEach(id => {

            // log the value of id for each loop iteration 
            console.log(id);

            dropdown.append("option")
            .text(id)
            .property("value", id);
        });

        // set the first default name from the names list
        let sample_one = names[0];

        // log the variable
        console.log(sample_one);

        //Build the initial plots
        drawGaugeChart(sample_one);

    });
};

function drawGaugeChart(name) {

    //Use D3 to get all data 
    d3.json(url).then((data) => {

        //get all the sample data
        let metaData = data.metadata;

        //filter based on the values from sample data
        let value = metaData.filter(result => result.id == name);

        //get first index of an array
        let index = value[0]

        //using Object entries to get the key/value pair
        let valueData = Object.values(index)[6];

        // log the retrieved data
        debugger;

        //set up the trace for bar chart
        var trace2 = {
           type: 'pie',
           showlegend: false,
           hole: 0.4,
           rotation: 90,
           value: valueData,
           text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
           title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
           },
           type: "indicator",
           mode: "gauge+number",
           gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
                steps: [
                    {range: [0,1], color: "rgba(255,255,255, 0)"},
                    {range: [1,2], color: "rgba(232,226,202, .5)"},
                    {range: [2,3], color: "rgba(210,206,145, .5)"},
                    {range: [3,4], color: "rgba(202,209,95, .5)"},
                    {range: [4,5], color: "rgba(184,205,68, .5)"},
                    {range: [5,6], color: "rgba(170,178,42, .5)"},
                    {range: [6,7], color: "rgba(142,154,35, .5)"},
                    {range: [7,8], color: "rgba(110,143,22, .5)"},
                    {range: [8,9], color: "rgba(50,127,10, .5)"}
                ]
           }
        };

        var layout = {
            width: 400,
            height: 400,
            xaxis: {t:0, b:0}
        }; 
          
        //call plotly to plot the bar chart
        Plotly.newPlot("gauge", [trace2], layout)
    });
};


init();
