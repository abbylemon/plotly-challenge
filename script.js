
d3.selectAll("#selDataset").on("change", optionChanged(sample_id));

function optionChanged(sample_id) {

    d3.json("./samples.json").then(function(data) {
        console.log(data);
        var names = data.names;
        console.log(names);
        var samples = data.samples;
        console.log(samples);

        // samples.forEach(function(samples) {
        //     var sample_values = samples.sample_values;
        //     var otu_ids = samples.otu_ids;
        //     var otu_labels = samples.otu_labels;
        // });

        var dropdownMenu = d3.select("#selDataset");
        var sample_id = dropdownMenu.property("value");

        var x = [];
        var y = [];

        if (sample_id === sample_id) {
            x = 
        }

    }).catch(function(error) {
        console.log(error);
    });

}

