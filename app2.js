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



        // // Use first sample to build metadata and initial plots
        // buildMetadata(parsedData[0]);
 
        // buildCharts(parsedData[0]);
 
    });
 }
 
 // Initialize dashboard on page load
 init();