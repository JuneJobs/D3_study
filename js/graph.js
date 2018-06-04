d3.csv("data/data.csv").then(function (data) {
   // if (err) throw err;
    var indTypeChart = dc.rowChart("#indType");
    var locTypeChart = dc.rowChart("#locType");
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    console.log(all);
    //var industTypeDim = ndex.dimension(function)
    var indTypeDim = ndx.dimension(function (d) { return d["indust_nm"]; })
    var locTypeDim = ndx.dimension(function (d) { return d["location"]; })

    var indTypeGroup = indTypeDim.group();
    var locTypeGroup = locTypeDim.group();

    indTypeChart
        .dimension(indTypeDim)
        .group(indTypeGroup);

    locTypeChart
        .dimension(locTypeDim)
        .group(locTypeGroup)
        //.data(function(group){});
    dc.renderAll();
})