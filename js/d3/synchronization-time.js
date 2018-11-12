// ------------------------------------------------
// The next figure
// ------------------------------------------------
(function() {
  d3.json("../../../../data/synchTimeVsK.json", function(error, data) {
    drawFinalPase(data);
  });
  function drawFinalPase(data) {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var height = 350;
    var width = 600;

    // Defining the scales
    xScale = d3
      .scaleLinear()
      .domain([0, 3])
      .range([margin.left, width - margin.right]);

    yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.data, d => d.synchTime))
      .range([height - margin.bottom, margin.top]);

    // Defining the axes
    xAxis = d3.axisBottom().scale(xScale);
    yAxis = d3.axisLeft().scale(yScale);

    // Drawing the canvas
    svg = d3
      .select("#synchronizationTime")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Loop through the data to draw a bunch of lines

    line = d3
      .line()
      .x(d => xScale(d.K))
      .y(d => yScale(d.synchTime));

    svg
      .append("svg:path")
      .datum(data.data)
      .attr("fill", "none")
      .attr("stroke", lightColorUsed)
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("d", line);

    // Draw the x axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // Draw the y axis
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    svg
      .append("text")
      .attr("class", "axisLabel")
      .text("K")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle");

    svg
      .append("text")
      .attr("class", "axisLabel")
      .text("Synchronization Time")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle");
  }
})();
