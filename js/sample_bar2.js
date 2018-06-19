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
var fluctuationChart = dc.barChart('#fluctuation-chart');
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
    var fluctuation = ndx.dimension(function (d) {
        return d.volume;
    });
    var fluctuationGroup = fluctuation.group();
    //fluctuationGroup = getTops(fluctuationGroup);

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

    fluctuationChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
        .width(990)
        .height(180)
        .margins({ top: 10, right: 50, bottom: 30, left: 40 })
        .dimension(fluctuation)
        .group(fluctuationGroup)
        .elasticY(true)
        .centerBar(true)
        // (_optional_) set gap between bars manually in px, `default=2`
        //.gap(1)
        // (_optional_) set filter brush rounding
        //.round(dc.round.floor)
        //.alwaysUseRounding(true)
        //.x(d3.scaleLinear().domain([-25, 25]))
        //.x.domain([0, fluctuationGroup.all()[0].volume])
        //.x.domain(data.map(function (d) { return d.volume; }))
        //.x(d3.scale.ordinal().domain)
        //.x.domain(data.map(function (d) { return d.volume; }))
        .x(d3.scaleOrdinal().domain(fluctuation)) 
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        // Customize the filter displayed in the control span
        // .filterPrinter(function (filters) {
        //     var filter = filters[0], s = '';
        //     s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
        //     return s;
        // });

    // Customize axes
   // fluctuationChart.xAxis().tickFormat(
    //    function (v) { return v + '%'; });
    fluctuationChart.yAxis().ticks(5);

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
    /*
    // Or you can render charts belonging to a specific chart group
    dc.renderAll('group');
    // Once rendered you can call `.redrawAll()` to update charts incrementally when the data
    // changes, without re-rendering everything
    dc.redrawAll();
    // Or you can choose to redraw only those charts associated with a specific chart group
    dc.redrawAll('group');
    */
});
function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
}