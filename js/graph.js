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
    var dateTypeDim = ndx.dimension(function (d) { return d.date; })


    var indTypeGroup = indTypeDim.group().reduceSum(function (d) { return 1; });
    indTypeGroup = getTops(indTypeGroup);
    var locTypeGroup = locTypeDim.group().reduceSum(function (d) { return 1; });
    locTypeGroup = getTops(locTypeGroup);
    var dateTypeGroup = dateTypeDim.group(d3.time.day);

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
    var charts = [
        barChart()
            .dimension(dateTypeDim)
            .group(dateTypeGroup)
            .round(d3.time.day.round)
            .x(d3.time.scale()
                .domain([new Date(2001, 0, 1), new Date(2001, 3, 1)])
                .rangeRound([0, 10 * 90]))
            .filter([new Date(2001, 1, 1), new Date(2001, 2, 1)])
    ];

    var chart = d3.selectAll(".chart")
        .data(charts)
        .each(function (chart) {
        chart.on("brush", renderAll).on("brushend", renderAll);
      });

    renderAll();
    // Renders the specified chart or list.
    function render(method) {
        d3.select(this).call(method);
    }
    function renderAll() {
        chart.each(render);
    }
    function barChart() {
        if (!barChart.id) barChart.id = 0;
        var margin = {
                top: 10,
                right: 10,
                bottom: 20,
                left: 10
            },
            x,
            y = d3.scale.linear().range([100, 0]),
            id = barChart.id++,
            axis = d3.svg.axis().orient("bottom"),
            brush = d3.svg.brush(),
            brushDirty,
            dimension,
            group,
            round;
        function chart(div) {
            var width = x.range()[1],
                height = y.range()[0];
            y.domain([0, group.top(1)[0].value]);
            div.each(function () {
                var div = d3.select(this),
                    g = div.select("g");
                // Create the skeletal chart.
                if (g.empty()) {
                    div.select(".title").append("a")
                        .attr("href", "javascript:reset(" + id + ")")
                        .attr("class", "reset")
                        .text("reset")
                        .style("display", "none");
                    g = div.append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    g.append("clipPath")
                        .attr("id", "clip-" + id)
                        .append("rect")
                        .attr("width", width)
                        .attr("height", height);
                    g.selectAll(".bar")
                        .data(["background", "foreground"])
                        .enter().append("path")
                        .attr("class", function (d) {
                            return d + " bar";
                        })
                        .datum(group.all());
                    g.selectAll(".foreground.bar")
                        .attr("clip-path", "url(#clip-" + id + ")");
                    g.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(axis);
                    // Initialize the brush component with pretty resize handles.
                    var gBrush = g.append("g").attr("class", "brush").call(brush);
                    gBrush.selectAll("rect").attr("height", height);
                    gBrush.selectAll(".resize").append("path").attr("d", resizePath);
                }
                // Only redraw the brush if set externally.
                if (brushDirty) {
                    brushDirty = false;
                    g.selectAll(".brush").call(brush);
                    div.select(".title a").style("display", brush.empty() ? "none" : null);
                    if (brush.empty()) {
                        g.selectAll("#clip-" + id + " rect")
                            .attr("x", 0)
                            .attr("width", width);
                    } else {
                        var extent = brush.extent();
                        g.selectAll("#clip-" + id + " rect")
                            .attr("x", x(extent[0]))
                            .attr("width", x(extent[1]) - x(extent[0]));
                    }
                }
                g.selectAll(".bar").attr("d", barPath);
            });

            function barPath(groups) {
                var path = [],
                    i = -1,
                    n = groups.length,
                    d;
                while (++i < n) {
                    d = groups[i];
                    path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
                }
                return path.join("");
            }

            function resizePath(d) {
                var e = +(d == "e"),
                    x = e ? 1 : -1,
                    y = height / 3;
                return "M" + (.5 * x) + "," + y +
                    "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
                    "V" + (2 * y - 6) +
                    "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) +
                    "Z" +
                    "M" + (2.5 * x) + "," + (y + 8) +
                    "V" + (2 * y - 8) +
                    "M" + (4.5 * x) + "," + (y + 8) +
                    "V" + (2 * y - 8);
            }
        }
        brush.on("brushstart.chart", function () {
            var div = d3.select(this.parentNode.parentNode.parentNode);
            div.select(".title a").style("display", null);
        });
        brush.on("brush.chart", function () {
            var g = d3.select(this.parentNode),
                extent = brush.extent();
            if (round) g.select(".brush")
                .call(brush.extent(extent = extent.map(round)))
                .selectAll(".resize")
                .style("display", null);
            g.select("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
            dimension.filterRange(extent);
        });
        brush.on("brushend.chart", function () {
            if (brush.empty()) {
                var div = d3.select(this.parentNode.parentNode.parentNode);
                div.select(".title a").style("display", "none");
                div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
                dimension.filterAll();
            }
        });
        chart.margin = function (_) {
            if (!arguments.length) return margin;
            margin = _;
            return chart;
        };
        chart.x = function (_) {
            if (!arguments.length) return x;
            x = _;
            axis.scale(x);
            brush.x(x);
            return chart;
        };
        chart.y = function (_) {
            if (!arguments.length) return y;
            y = _;
            return chart;
        };
        chart.dimension = function (_) {
            if (!arguments.length) return dimension;
            dimension = _;
            return chart;
        };
        chart.filter = function (_) {
            if (_) {
                brush.extent(_);
                dimension.filterRange(_);
            } else {
                brush.clear();
                dimension.filterAll();
            }
            brushDirty = true;
            return chart;
        };
        chart.group = function (_) {
            if (!arguments.length) return group;
            group = _;
            return chart;
        };
        chart.round = function (_) {
            if (!arguments.length) return round;
            round = _;
            return chart;
        };
        return d3.rebind(chart, brush, "on");
    
    }
})

function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
}
