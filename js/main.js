// console.log ('sim sim salabim')

// CANVAS + MARGINS
// =================

var margin, width, height, g;

margin = {
    left: 100,
    right: 10,
    top: 50,
    bottom: 150
};

width = 750 - margin.left - margin.right;
height = 550 - margin.top - margin.bottom;

// CANVAS APPEND
g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// LABELS
// =================

// X
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height + 100)
    .attr('font-size', '21px')
    .attr('text-anchor', 'middle')
    .text('QB Name');

// Y
g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(height / 2))
    .attr('y', -75)
    .attr('font-size', '21px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Passing Yds (active)');

// DATA
// =================
d3.json('data/qb_stats.json').then( data => {
    // console.log(data);

    var x, y, xAxisCall, yAxisCall, rects, circles;

    x = d3.scaleBand()
        .domain(data.map( d => {
            return d.player;
        } ))
        .range([0, width])
        .padding(0.3);

    y = d3.scaleLinear()
        .domain([0, d3.max(data, d => {
            return d.yds;
        })])
        .range([height, 0]);

    xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisCall)
        .selectAll('text')
            .attr('y', '10')
            .attr('x', '-5')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-40)');

    yAxisCall = d3.axisLeft(y)
        .ticks(7)
        .tickFormat( d => {
            return d + 'yds';
        });
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxisCall);
    
    circles = g.selectAll('circle')
        .data(data);
    
    circles.enter()
        .append('circle')
        .attr('cx', d => {
            return x(d.player) + x.bandwidth() / 2;
        })
        .attr('cy', d => {
            return y(d.yds);
        })
        .attr('r', 5)
        .attr('width', x.bandwidth)
        .attr('fill', '#007041');

    

})