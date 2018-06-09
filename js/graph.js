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

d3.csv("data/data.csv").then(function (data) {
   // if (err) throw err;
    var indTypeChart = dc.barChart("#indType");
    var locTypeChart = dc.barChart("#locType");
 
/*
    var formatDate = d3.time.format("%b %d, %Y");
    var nestByDate = d3.nest()
        .key(function (d) { return d3.time.day(d.date); });
    data.forEach(function (d, i) {
        d.date = parseDate(d.date);
    });
*/
 
//add bar chart
 
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    console.log(all);
    //var industTypeDim = ndex.dimension(function)
    var indTypeDim = ndx.dimension(function (d) { return d["indust_nm"]; })
    var locTypeDim = ndx.dimension(function (d) { return d["location"]; })



    var indTypeGroup = indTypeDim.group().reduceSum(function (d) { return 1; });
    indTypeGroup = getTops(indTypeGroup);
    var locTypeGroup = locTypeDim.group().reduceSum(function (d) { return 1; });
    locTypeGroup = getTops(locTypeGroup);

    indTypeChart
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .dimension(indTypeDim)
        .group(indTypeGroup)
    locTypeChart
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .dimension(locTypeDim)
        .group(locTypeGroup);//{return group.top(4)});
    //     .elasticX(true)
    //     .data(function(group){return group.top(3)});

    dc.renderAll();
})

function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
}
