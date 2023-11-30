
d3.csv("/fastfood_calories.csv").then(function(data) {
  // Convert calorie values to numbers
  data.forEach(d => {
      d.calories = +d.calories;
  });

  // Group data by item and calculate average calories
  const nestedData = d3.nest()
      .key(d => d.item)
      .rollup(values => d3.mean(values, d => d.calories))
      .entries(data);

  // Extract averages from the nested structure
  const averages = nestedData.map(d => ({ item: d.key, averageCalories: d.value }));

  // Create SVG container dimensions
  const width = 800;
  const height = 400;

  // Create a linear scale for the y-axis
  const yScale = d3.scaleLinear()
      .domain([0, d3.max(averages, d => d.averageCalories)])
      .range([height, 0]);

  // Create the SVG container
  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  // Create bars in the bar chart
  svg.selectAll("rect")
      .data(averages)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (width / averages.length))
      .attr("y", d => yScale(d.averageCalories))
      .attr("width", width / averages.length - 5)
      .attr("height", d => height - yScale(d.averageCalories))
      .attr("fill", "steelblue");

  // Add labels to the bars
  svg.selectAll("text")
      .data(averages)
      .enter()
      .append("text")
      .text(d => Math.round(d.averageCalories)) // Display rounded average calories
      .attr("x", (d, i) => i * (width / averages.length) + (width / averages.length) / 2)
      .attr("y", d => yScale(d.averageCalories) - 10) // Adjust position for better visibility
      .attr("text-anchor", "middle")
      .attr("fill", "white");
});
