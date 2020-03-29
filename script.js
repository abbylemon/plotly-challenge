
function init() {
    d3.json("./samples.json").then(function(data) {
        // grab the data that we want to populate the dropdown menu with
        var names = data.names;
        var dropdownMenu = d3.select("#selDataset");
        names.forEach(function(name) {
            dropdownMenu.append("option")
                .attr("value", name)
                .text(name);
        });

        // populate the initial plot by useing the first name value
        var firstid = names[0];
        DemoInfo(firstid);
        BuildCharts(firstid);

    }).catch(function(error) {
        console.log(error);
    });
}

function optionChanged(sampleid) {
    // re-draw the plots and chart with the change of the dropdown selection
    DemoInfo(sampleid);
    BuildCharts(sampleid);
}


// function to update demographic info
function DemoInfo(id) {
    d3.json("./samples.json").then(function(data) {
        // grab the metadata and filter it per the id selected
        var metadata = data.metadata;
        var filterResults = metadata.filter(x => x.id == id);
        filterResults = filterResults[0];
        console.log(filterResults);

        // grab the metadata div, clear it and populate it with the desired data
        var metaData = d3.select("#sample-metadata");
        d3.selectAll("h5").remove();
        metaData.append("h5").text("id: " + filterResults.id);
        metaData.append("h5").text("ethnicity: " + filterResults.ethnicity);
        metaData.append("h5").text("gender: " + filterResults.gender);
        metaData.append("h5").text("age: " + filterResults.age);
        metaData.append("h5").text("location: " + filterResults.location);
        metaData.append("h5").text("bbtype: " + filterResults.bbtype);
        metaData.append("h5").text("wfreq: " + filterResults.wfreq);

    })

}
// function to update bar plot and bubble plot
function BuildCharts(id) {
    d3.json("./samples.json").then(function(data) {
        // grab the data that we need and filter it based on the id
        var samples = data.samples;
        var filterResult = samples.filter(x => x.id == id)[0];
        var otu_ids = filterResult.otu_ids;
        var sample_values = filterResult.sample_values;
        var otu_labels = filterResult.otu_labels;

        // grab the first 10 values since they are already sorted
        var otu_ids_10 = filterResult.otu_ids.slice(0,10).reverse();
        var sample_values_10 = filterResult.sample_values.slice(0,10).reverse();
        var otu_labels_10 = filterResult.otu_labels.slice(0,10).reverse();
        
        // create the plot for the horizonal bar pot
        var trace = {
            x: sample_values_10,
            y: otu_ids_10.map(d=>"OTU " + d),
            text: otu_labels_10,
            type: "bar",
            orientation: "h"
        };
    
        var barData = [trace];

        Plotly.newPlot("bar", barData);

        // create the bubble plot
        var traceB = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: "scatter",
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }

        var bubbleData = [traceB];

        Plotly.newPlot("bubble", bubbleData);

    });
    
}

init();