
function init() {
    d3.json("./samples.json").then(function(data) {
        // console.log(data);
        // populate the dropdown section with all of the name values
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
        var samples = data.samples;
        // samples.forEach(function(sample) {
        //     sample.id = String(sample.id);
        // });
        var filterResult = samples.filter(x => x.id == id)[0];
        var otu_ids = filterResult.otu_ids.slice(0,10).reverse();
        var sample_values = filterResult.sample_values.slice(0,10).reverse();
        var otu_labels = filterResult.otu_labels.slice(0,10).reverse();
        // var otu_ids = filterResult.otu_ids.slice(0,10).reverse();
        // var sample_values = filterResult.sample_values.slice(0,10).reverse();
        // var otu_labels = filterResult.otu_labels.slice(0,10).reverse();

        // var sortedData = data.sort((a,b) =>
        //     b.sample_values - a.sample_values);
        // var slicedData = sortedData.slice(0,10);
        // var reversedData = slicedData.reverse();

        var trace = {
            // x: sample_values.slice(0,10).reverse(),
            // y: otu_ids.slice(0,10).reverse(),
            // text: otu_labels.slice(0,10).reverse(),
            x: sample_values,
            y: otu_ids.map(d=>"OTU " + d),
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
    
        var barData = [trace];
    
        var layout = {
            title: (`Top 10 OTU's for Sample ${id}`),
            // xaxis: {title: "Sample Value"},
            // yaxis: {title: "OTU Type"}
        };

        Plotly.newPlot("bar", barData, layout);

        var traceB = {
            x: otu_ids,
            y: sample_values,
            type: "scatter",
            mode: "markers",
            markers: {
                color: otu_ids,
                size: sample_values,
                colorscale: "Earth"
            }
        }

        var bubbleData = [traceB];

        var layoutB = {
            title: "Bubble Plot",
            margin: {
                t: 30,
                l: 50
            }
        }

        Plotly.newPlot("bubble", bubbleData, layoutB);

    });
    
}

init();