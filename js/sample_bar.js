//# dc.js Getting Started and How-To Guide
'use strict';
/*
"date","open","high","low","close","volume","oi"
11/01/1985,115.48,116.78,115.48,116.28,900900,0
11/04/1985,116.28,117.07,115.82,116.04,753400,0
11/05/1985,116.04,116.57,115.88,116.44,876800,0
11/06/1985,116.44,117.62,116.44,117.38,935000,0
11/07/1985,117.38,117.96,117.38,117.62,886400,0
11/08/1985,117.62,119.39,117.58,119.26,867600,0
 */
var fluctuationChart = dc.barChart('#fluctuation-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');


d3.csv("data/ndx.csv").then(function (data) { 
    //데이터 crossfilter에 대입
    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    data.forEach(function (d) {
        d.dd = dateFormatParser(d.date);
        d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
    });

    // Dimension by month
    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });

    // Group by total volume within move, and scale down result
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return 1;
    });
    

    volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)
        .margins({ top: 0, right: 50, bottom: 20, left: 40 })
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.timeMonth.round)
        .alwaysUseRounding(true)
        .xUnits(d3.timeMonths);
});
