function init() {
    //Set default in local storage
    localStorage.setItem("neighborhoodName", "CollgCr")
    localStorage.setItem("numberBedrooms", 2)
    localStorage.setItem("numberBathrooms", 0)
    d3.json("train.json").then((sampleData) => {
        //creating filters
        var neighborhood = [... new Set(sampleData.map(item2 => item2.Neighborhood))].sort((a,b)=> a-b)
        var bedrooms = [... new Set(sampleData.map(item2 => item2.TotRmsAbvGrd))].sort((a,b)=> a-b)
        var bathrooms = [... new Set(sampleData.map(item2 => item2.FullBath))].sort((a,b)=> a-b)


        ///MAPPING
        neighborhood.map(item=>{
           document.querySelector("#selNumberNeighborhoods").innerHTML+=`
                <option value="${item}" class="neighborhoodOption">${item}</option>
            ` 
        })
        bedrooms.map(item=>{
            document.querySelector("#selNumberBedrooms").innerHTML+=`
                 <option value="${item}" class="bedroomOption">${item}</option>
             ` 
         })

        bathrooms.map(item=>{
            document.querySelector("#selNumberBathrooms").innerHTML+=`
                 <option value="${item}" class="bathroomOption">${item}</option>
             ` 
         })

         //////////BUILD CHARTS
        document.querySelector("#selNumberNeighborhoods").addEventListener("change", (e)=>{
            localStorage.setItem("neighborhoodName", e.target.value);
                buildCharts(sampleData);
        });
         document.querySelector("#selNumberBedrooms").addEventListener("change", (e)=>{
            localStorage.setItem("numberBedrooms", e.target.value);
                buildCharts(sampleData);

        });
        document.querySelector("#selNumberBathrooms").addEventListener("change", (e)=>{
            localStorage.setItem("numberBathrooms", e.target.value);
                buildCharts(sampleData);

        });
        buildCharts(sampleData)
    })
}
function optionChanged1(nhbrhd){
    return nhbrhd
}
function optionChanged2(bdrm){
    console.log(bdrm);
    return bdrm
}

function optionChanged3(bathroom){
    console.log(bathroom);
    return bathroom
}

function buildCharts(data){
    var n, b, bath;
    if(localStorage.getItem("neighborhoodName")){
        n = localStorage.getItem("neighborhoodName") || "Gilbert"
    }
    if(localStorage.getItem("numberBedrooms")){
        b = localStorage.getItem("numberBedrooms") || 8
    }
    if(localStorage.getItem("numberBathrooms")){
        bath = localStorage.getItem("numberBathrooms") || 2
    }
var filteredData = data.filter(item => item.Neighborhood == n && item.TotRmsAbvGrd === parseInt(b) && item.FullBath === parseInt(bath));
console.log(filteredData)

}
 
init()