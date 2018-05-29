/// <reference path="d3.min.js" />
/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen


*/
//var data = [25, 20, 10, 12, 15]
/*
//level 1
var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);  

var circles = svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 250)
        .attr("r", 70)
        .attr("fill", "red");
*/
/*
//level 2
var data = [25, 20, 10, 12, 15];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

var circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
    .attr("cx", (d, i) => {
        return (i * 50) - 25;
    })
    .attr("cy", 25)
    .attr("r", function(d){
        console.log(d);
        return d;
    })
*/
/*
//level 3
var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", "400")
        .attr("height", "400");

d3.json("data/buildings.json").then((data) => {
    console.log(data);
    data.forEach(d => {
        d.height = +d.height;
    });
    
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function(d, i){
            return (i * 60);
        })
        .attr("width", 40)
        .attr("height", function(d){
            return y(d.height);
        })
        .attr("fill", function (d){
            return "grey";
        });
}).catch(function(error){
    console.log(error);
})
*/
/*
//level 4

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/buildings.json").then(function(data){
    console.log(data);

    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(["Burj Khalifa", "Shangi Tower", "Al-Bait Clock Tower", 
            "Ping An Finance Center", "Lotte World Tower", "Lotte World Tower2", "Lotte World Tower3"])
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3)
    
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);
    
    var rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", 20)
    .attr("x", function(d){
        return x(d.name);
    })
    .attr("width", x.bandwidth)
    .attr("height", function (d) {
        return y(d.height);
    })
    .attr("fill", function(d){
        return "grey";
    })
}).catch(function (error) {
    console.log(error);
})
*/

/*
//Level 5


var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/buildings.json").then(function(data){
    console.log(data);

    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map(function(d){
            return d.name;
        }))
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.height
        })])
        .range([0, 400]);

    var rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", 20)
    .attr("x", function(d){
        return x(d.name);
    })
    .attr("width", x.bandwidth)
    .attr("height", function (d) {
        return y(d.height);
    })
    .attr("fill", function(d){
        return "grey";
    })
}).catch(function (error) {
    console.log(error);
})

*/
/*
 * Level 6 : Margin

var margin = {left:100, right:10, top:10, bottom:100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left+"," + margin.top + ")");

d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.height
        })])
        .range([0, height]);

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function (d) {
            return x(d.name);
        })
        .attr("width", x.bandwidth)
        .attr("height", function (d) {
            return y(d.height);
        })
        .attr("fill", function (d) {
            return "grey";
        })
}).catch(function (error) {
    console.log(error);
})
*/
/*
 * Level 6 : Add some axies label
 */
var margin = { left: 100, right: 10, top: 10, bottom: 100 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
/// x Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The word's tallest buildings");
/// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", - 60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");

d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.height
        })])
        .range([0, height]);
    
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, "+ height +")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform","rotate(-30)"); // angle change.

    var yAxisCall = d3.axisLeft(y);
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function (d) {
            return x(d.name);
        })
        .attr("width", x.bandwidth)
        .attr("height", function (d) {
            return y(d.height);
        })
        .attr("fill", function (d) {
            return "grey";
        })
}).catch(function (error) {
    console.log(error);
})