(async function () {
    // set the dimensions and margins of the graph
    const windowWidth = Math.min(
        parseInt(d3.select('p').style('width'), 10),
        680
    );
    const margin = { top: 30, right: 10, bottom: 10, left: 0 }
    const width = windowWidth - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#publicArtSmoothBraid")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    const data = await d3.json("/data/colors-public-art-bump-braid-gradient.json")  
    let yScale = d3.scaleLinear()
        .domain(d3.extent([0, 4]))
        .range([height, 0])

    let xScale = d3.scaleLinear()
        .domain(d3.extent([1960, 1968]))
        .range([0, width])

    data.forEach(e => {

        function sigmoid(x) {
            return Math.exp(x)/(Math.exp(x)+1)
        }

        function interpolate(data) {
            let startLevel = data[0].y
            let stopLevel = data[1].y
            let startYear = data[0].x

            let numPoints = 25;
            let points = [];
            let sigmoidXStart = 9
            let sigmoidX = -sigmoidXStart
            for (i=0; i < numPoints + 2; i++) {
                points.push(
                    { 
                        'x': startYear + (i / numPoints), 
                        'y': startLevel + (stopLevel - startLevel) * sigmoid(sigmoidX)}
                )
                sigmoidX = sigmoidX + ((2 * sigmoidXStart) / numPoints)
            }
            return points
        }

        interpolate(e.line)

        const line = d3
            .line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        svg.append("path")
            .datum(interpolate(e.line))
            .attr("d", line)
            .classed('colorLine', true)
            .attr('stroke', e.color)
    });
})()