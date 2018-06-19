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

/**
 * Step 1: Create the dc.js chart objects
 */
var firstChart = dc.barChart('#first-chart');
var secondChart = dc.barChart('#second-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');

/**
 * Step 2: Loead data from csv file
 */
d3.csv("data/ndx.csv").then(function (data) {
    //데이터 crossfilter에 대입
    
    /**
     * Step3 Create Dimension that we'll need
     */
    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    var dateFormatSpecifier = '%m/%d/%Y';
    var dateFormat = d3.timeFormat(dateFormatSpecifier);
    var dateFormatParser = d3.timeParse(dateFormatSpecifier);
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormatParser(d.date);
        d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
    });

    // Determine a histogram of percent changes
    var first = ndx.dimension(function (d) {
        return d.volume;
    });
    var firstGroup = first.group();
    firstGroup = getTops(firstGroup);

    // Determine a histogram of percent changes
    var second = ndx.dimension(function (d) {
        return d.close;
    });
    var secondGroup = second.group();
    secondGroup = getTops(secondGroup);

    // Dimension by month
    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });
    // Group by total volume within move, and scale down result
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return 1;
    });
    /** 
     * Step 4 Create the Visualiztations
    */

    firstChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
        .width(window.screen.width - 200)
        .height(180)
        .margins({ top: 10, right: 100, bottom: 30, left: 40 })
        .dimension(first)
        .group(firstGroup)
        .elasticY(true) //.elasticY and .elasticX determine whether the chart should rescale each axis to fit the data.
        .x(d3.scaleOrdinal().domain(firstGroup))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Fisrt Type")
        .yAxisLabel("First Quantity")
        .barPadding(0.05)
        .outerPadding(0.05)
        //.centerBar(true)
        .renderHorizontalGridLines(true)

    firstChart.yAxis().ticks(5);

    secondChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
        .width(window.screen.width - 200)
        .height(180)
        .margins({ top: 10, right: 100, bottom: 30, left: 40 })
        .dimension(first)
        .group(secondGroup)
        .elasticY(true) //.elasticY and .elasticX determine whether the chart should rescale each axis to fit the data.
        .x(d3.scaleOrdinal().domain(secondGroup))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Second Type")
        .yAxisLabel("Second Quantity")
        .barPadding(0.05)
        .outerPadding(0.05)
        //.centerBar(true)
        .renderHorizontalGridLines(true)

    secondChart.yAxis().ticks(5);





    // Determine a histogram of percent changes
    volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)    //높이
        .margins({ top: 0, right: 50, bottom: 20, left: 40 })
        .dimension(moveMonths)  //치수
        .group(volumeByMonthGroup)  //그룹
        .centerBar(true)    //
        .gap(1)
        .x(d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2000, 11, 31)]))
        //.y(d3.scaleLinear().domain([0, 100]))
        .round(d3.timeMonth.round)
        .alwaysUseRounding(true)
        .renderHorizontalGridLines(true) //그리드 라인 그리는 함수
        .xUnits(d3.timeMonths);

    volumeChart.yAxis().ticks(4);

    //#### Rendering

    //simply call `.renderAll()` to render all charts on the page
    dc.renderAll();

});
function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(10);
        }
    };
}