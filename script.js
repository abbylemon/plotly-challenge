
// d3.selectAll("#selDataset").on("change", optionChanged(sampleid));

function init() {
    // population with a plot on default 
    d3.json("./samples.json").then(function(data) {
        console.log(data);
        var names = data.names;
        console.log(names);
        var samples = data.samples;
        console.log(samples);


        var dropdownMenu = d3.select("#selDataset");

        names.forEach(function(name) {
            dropdownMenu.append("option")
                .attr("value", name)
                .text(name);
        });

        var firstid = names[0];
        DemoInfo(firstid);
        BuildCharts(firstid);

        // create initial demographic data, bar plot and bubble plot
        // need to sort by sample values for specific id, and plot the first 10
        

        // var sample_id = dropdownMenu.property("value");

        // var x = [];
        // var y = [];

        // if (sample_id === sample_id) {
        //     function filterSampleID () {
                
        //     }
        //     x = 
        // }

    }).catch(function(error) {
        console.log(error);
    });
}

function optionChanged(sampleid) {
    // update demographic info, bubble plot and bar plot
    // call functions for each of these
    DemoInfo(sampleid);
    BuildCharts(sampleid);

}


// function to update demographic info
function DemoInfo(id) {
    d3.json("./samples.json").then(function(data) {
        var metadata = data.metadata;
        var filterResults = metadata.filter(x => x.id == id);
        filterResults = filterResults[0];
        console.log(filterResults);
        
    })

}
// function to update bar plot
function BuildCharts(id) {
    d3.json("./samples.json").then(function(data) {
        var samples = data.samples;
        var filterResult = samples.filter(x => x.id == id);
        // console.log(filterResult);
        filterResult = filterResult[0];
        // console.log(filterResult);
        var otu_ids = filterResult.otu_ids;
        var sample_values = filterResult.sample_values;
        var otu_labels = filterResult.otu_labels;

        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
    
        var barData = [trace];
    
        var layout = {
            title: (`Top 10 OTU's for Sample ${id}`),
            xaxis: {title: "Sample Value"},
            yaxis: {title: "OTU Type"},
            margin: {t: 20, l: 50}
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