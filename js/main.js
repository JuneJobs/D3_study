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
*/
