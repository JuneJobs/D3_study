//location, incorporationDate, year_cd, indust_cd, indust_nm
/*
var chartIndustryByCode = dc.barChart('#indType');

d3.csv("data/data.csv", function(err, data){
    var ndx = crossfilter(data),
    industryDim = ndx.dimension(function(d){return d.indust_cd;}),
    IndustryGroup = industryDim.group().reduceSum(function(d){ return 1});
    
    chartIndustryByCode
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Industry code')
        .yAxisLabel('Amount')
        .dimension(industryDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(IndustryGroup);
    
    
    chartIndustryByCode.render();
});
*/

d3.csv("data/data.csv", function (err, data) {
   // if (err) throw err;
    var indTypeChart = dc.barChart("#indType");
    var locTypeChart = dc.barChart("#locType"); 
//add bar chart
 
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    console.log(all);
    //var industTypeDim = ndex.dimension(function)
    //var indTypeDim = ndx.dimension(function (d) { return d["indust_nm"]; })
    //var locTypeDim = ndx.dimension(function (d) { return d["location"]; })
    var dateTypeDim = ndx.dimension(function (d) {
        var st = d["incorporationDate"];
        var pattern = /(\d{4})\.(\d{2})\.(\d{2})/;
        var dt = new Date(st.replace(pattern, '$1-$2-$3')); 
        return dt; 
    })


    var indTypeGroup = indTypeDim.group().reduceSum(function (d) { return 1; });
    indTypeGroup = getTops(indTypeGroup);
    var locTypeGroup = locTypeDim.group().reduceSum(function (d) { return 1; });
    locTypeGroup = getTops(locTypeGroup);
    var dateTypeGroup = dateTypeDim.group(d3.timeDays);


})
function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
}
