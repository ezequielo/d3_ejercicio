// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 40, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./data/titanic.csv", function (row, i) {
    return {
        name: row.Name,
        survived: (row.Survived == 1) ? "Yes" : "No",
        sex: row.Sex,
        age: +row.Age,
        fare: +row.Fare,
        key: i
    };
}, function (err, rows) {

    var ages = rows.map(row => row.age);
    var fares = rows.map(row => row.fare);
    var maxAge = d3.max(ages);
    var minAge = d3.min(ages);
    var maxFare = d3.max(fares);
    var minFare = d3.min(fares);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([minFare, maxFare])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .style("text-anchor", "end")
        .text("Fare");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([minAge, maxAge])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("class", "label")
        .attr("x", -30)
        .attr("y", height/2)
        .style("text-anchor", "end")
        .text("Age");

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(rows)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.fare); })
        .attr("cy", function (d) { return y(d.age); })
        .attr("fill", function (d) { return d.survived == "Yes" ? "blue" : "red" })
        .attr("r", 5)
        .style("opacity", 0.3)
        .style("stroke", "white")
            .append("title").text(function (d) { return d.name })

})
