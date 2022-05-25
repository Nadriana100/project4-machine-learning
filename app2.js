//  // Define a function that will create metadata for given sample
// function buildMetadata(selectionNeighborhood, selectionBedroom, selectionBathroom, selectionFireplace) {

//     // Read the json data
//     d3.json("train.json").then((sampleData) => {
 
//         console.log(sampleData);
 
//         // Parse and filter the data to get the sample's metadata
//         var parsedData = sampleData;
 
//         var sample = parsedData.filter(item => item.Neighborhood == selectionNeighborhood);
//         sample = sample.filter(item=> item.TotRmsAbvGrd == selectionBedroom);
//         sample = sample.filter(item=> item.FullBath == selectionBathroom);
//         sample = sample.filter(item=> item.Fireplaces == selectionFireplace);
//         console.log("showing sample[0]:");
//         console.log(sample[0]);
 
//         // Specify the location of the metadata and update it
//         var metadata = d3.select("#sample-metadata").html("");
 
//         Object.entries(sample[0]).forEach(([key, value]) => {
//             metadata.append("p").text(`${key}: ${value}`);
//         });
 
//         console.log("next again");
//         console.log(metadata);
//     });
//  }
 
 // Define a function that will create charts for given sample
 function buildCharts(selectionNeighborhood, selectionBedroom, selectionBathroom, selectionFireplace) {
 
    // Read the json data
    d3.json("train.json").then((sampleData) => {

        console.log("parsed data inside buildCharts function")
        console.log(sampleData);
 
        var sample = sampleData.filter(item => item.Neighborhood == selectionNeighborhood);
        sample = sample.filter(item=> item.TotRmsAbvGrd == selectionBedroom);
        sample = sample.filter(item=> item.FullBath == selectionBathroom);
        sampleDict = sample.filter(item=> item.Fireplaces == selectionFireplace);
        console.log("sampleDict")
        console.log(sampleDict);
 
        /////////////////////////////// BAR CHART ///////////////////////////////////////////
        // the values (x axis) is the year built
        var barChartValues = sampleDict.map(item5 => item5.YearBuilt)
        console.log("Year Built")
        console.log(barChartValues);
 
        // the labels (y axis) is the sale price
        var barChartLabels = sampleDict.map(item5 => item5.SalePrice)
        console.log("Sale Price");
        console.log(barChartLabels);
 
        // Create bar chart in correct location
        var barChartTrace = {
            type: "bar",
            y: barChartLabels,
            x: barChartValues,
            text: barChartValues,
            orientation: 'v'
        };

        var barChartlayout = {
            showlegend: false,
            height: 500,
            width: 600,
            xaxis: {
                title: "Year Built"
            },
            yaxis: {
                title: "Price"
            }
        };
 
        var barChartData = [barChartTrace];
        Plotly.newPlot("bar", barChartData, barChartlayout);


 
        ///////////////////////////////// BUBBLE CHART ///////////////////////////////
 
        // the values (x axis) is the year built
        var x_axis_bubble = sampleDict.map(item5 => item5.OverallCond)
        console.log("Overall Condition")
        console.log(x_axis_bubble);
        // the labels (y axis) is the sale price
        var y_axis_bubble = sampleDict.map(item5 => item5.SalePrice)
        console.log("Sale Price")
        console.log(y_axis_bubble);



        var bubbleChartTrace = {
            x: x_axis_bubble,
            y: y_axis_bubble,
            mode: "markers",
            marker: {
                color: x_axis_bubble,
                size: x_axis_bubble * 10
            }
        };
 
        var bubbleChartlayout = {
            showlegend: false,
            height: 500,
            width: 600,
            xaxis: {
                title: "Overall Condition"
            },
            yaxis: {
                title: "Price"
            }
        };
 
        var bubbleChartData = [bubbleChartTrace];
        Plotly.newPlot("bubble", bubbleChartData, bubbleChartlayout);



        ///////////////////////////////// SCATTER PLOT CHART ///////////////////////////////

        // the values (x axis) is the lot area
        var x_axis_scatter = sampleDict.map(item5 => item5.LotArea)
        console.log("Overall Condition for scatterplot")
        console.log(x_axis_scatter);
        // the labels (y axis) is the sale price
        var y_axis_scatter = sampleDict.map(item5 => item5.SalePrice)
        console.log("Sale Price for scatterplot")
        console.log(y_axis_scatter);



        var scattterChartTrace = {
            type: 'scatter',
            mode: "markers",
            x: x_axis_scatter,
            y: y_axis_scatter
        };
    
        var scatterChartlayout = {
            showlegend: false,
            height: 500,
            width: 600,
            xaxis: {
                title: "Lot area (in square feet)"
            },
            yaxis: {
                title: "Price"
            }
        };
    
        var scatterChartData = [scattterChartTrace];
        Plotly.newPlot("scatter", scatterChartData, scatterChartlayout);

    });
 }
 
 
 
 // Define function that will run on page load
 function init() {
 
    // Read json data
    d3.json("train.json").then((sampleData) => {
        //Let's see the data
        console.log(sampleData)

        //Populate filter for Neighborhood
        var sampleNeighborhoods = [... new Set(sampleData.map(item5 => item5.Neighborhood))].sort((a,b)=> a-b)
        var dropdownMenu5 = d3.select("#selNumberNeighborhoods");
        sampleNeighborhoods.forEach((Neighborhood) => {
            dropdownMenu5.append("option").property("value", Neighborhood).text(Neighborhood);
        })

        //Populate filter for number of Bedrooms
        var sampleBedroom = [... new Set(sampleData.map(item2 => item2.TotRmsAbvGrd))].sort((a,b)=> a-b)
        var dropdownMenu2 = d3.select("#selNumberBedrooms");
        sampleBedroom.forEach((Bedroom) => {
            dropdownMenu2.append("option").property("value", Bedroom).text(Bedroom);
        })
        
        //Populate filter for number of Bathrooms
        var sampleBathrooms = [... new Set(sampleData.map(item3 => item3.FullBath))].sort((a,b)=> a-b)
        var dropdownMenu3 = d3.select("#selNumberBathrooms");
        sampleBathrooms.forEach((Bathroom) => {
            dropdownMenu3.append("option").property("value", Bathroom).text(Bathroom);
        })

        //Populate filter for number of Fireplaces
        var sampleFireplaces = [... new Set(sampleData.map(item4 => item4.Fireplaces))].sort((a,b)=> a-b)
        var dropdownMenu4 = d3.select("#selNumberFireplaces");
        sampleFireplaces.forEach((Fireplace) => {
            dropdownMenu4.append("option").property("value", Fireplace).text(Fireplace);
        })

        parsedDataNeighborhood = sampleData[0].Neighborhood
        parsedDataBedroom  = sampleData[0].TotRmsAbvGrd
        parsedDataBathroom = sampleData[0].FullBath
        parsedDataFireplace = sampleData[0].Fireplaces

        // // Use first sample to build metadata and initial plots
        //buildMetadata(parsedDataNeighborhood[0],parsedDataBedroom[0],parsedDataBathroom[0],parsedDataFireplace[0]);
 
        buildCharts(parsedDataNeighborhood, parsedDataBedroom, parsedDataBathroom, parsedDataFireplace);
 
    });
 }

 ////////////////////////////////////////4 functions to change the options in the filters/////////////////
// optionChanged1 -> used if you change the neighborhood
 function optionChanged1(newselectionNeighborhood) {
    buildCharts(newselectionNeighborhood, parsedDataBedroom, parsedDataBathroom, parsedDataFireplace);
 }

// optionChanged2 -> used if you change the number of bedrooms
function optionChanged2(newselectionBedrooms) {
    buildCharts(parsedDataNeighborhood, newselectionBedrooms, parsedDataBathroom, parsedDataFireplace);
 }

// optionChanged3 -> used if you change the number of bathrooms
function optionChanged3(newselectionBathrooms) {
    buildCharts(parsedDataNeighborhood, parsedDataBedroom, newselectionBathrooms, parsedDataFireplace);
 }

 // optionChanged2 -> used if you change the number of fireplaces
function optionChanged4(newselectionFireplaces) {
    buildCharts(parsedDataNeighborhood, parsedDataBedroom, parsedDataBathroom, newselectionFireplaces);
 }

 
 // Initialize dashboard on page load
 init();