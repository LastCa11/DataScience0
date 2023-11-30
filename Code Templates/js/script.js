// Load data using D3
d3.csv("data/fastfood_calories.csv").then(function(data) {
  // Data processing and manipulation as needed

  // Page navigation
  let currentPage = 0; // Initial page

  // Visualization using D3
  const svg = d3.select("#visualization-container")
    .append("svg")
    .attr("width", /* specify width */)
    .attr("height", /* specify height */);

  // Text for different pages
  const pages = [
    "Welcome to the Fast Food Nutrients Analysis",
    "Upon examining the data, it becomes apparent that certain fast-food items stand out for their relatively healthier macronutrient profiles...",
    "Expanding the analysis to assess the overall healthiness of entire fast-food chains involves aggregating and comparing nutritional values across all their offerings...",
    "Furthermore, the dataset may allow for the examination of regional or categorical variations in nutritional content...",
    "In the interactive webpage, users can explore these findings by navigating through different visualizations. Clicking on specific data points or categories might reveal more detailed information...",
    "It's essential to note that the actual findings and analyses would depend on the specific details of the `fastfood_calories.csv` dataset, and the code would need to be tailored to the characteristics of the data."
  ];

  // Update the page content
  function updatePage() {
    svg.selectAll("*").remove(); // Clear existing content

    // Display text for the current page
    svg.append("text")
      .attr("x", 50)
      .attr("y", 50)
      .text(pages[currentPage]);

    // Implement specific visualizations or data representations for each page if needed
  }

  // Initial page load
  updatePage();

  // Click event for navigation
  svg.on("click", function(event) {
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;

    if (clickX > screenWidth / 2 && currentPage < pages.length - 1) {
      // Move to the next page
      currentPage += 1;
      updatePage();
    } else if (clickX <= screenWidth / 2 && currentPage > 0) {
      // Move to the previous page
      currentPage -= 1;
      updatePage();
    }
  });
});
