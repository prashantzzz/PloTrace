document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.getElementById("theme");
  const infield = document.getElementById('infield');
  const output = document.getElementById('output');

  // Function to plot graph using D3.js
  function plotGraph(data) {
      try {
          const graphData = JSON.parse(data);

          // Clear previous graph
          output.innerHTML = '';

          // Create SVG element for the graph
          const svg = d3.select("#output");

          // Create D3 force simulation for the graph
          const simulation = d3.forceSimulation(graphData.nodes)
              .force('link', d3.forceLink(graphData.links).id(d => d.id))
              .force('charge', d3.forceManyBody().strength(-300))
              .force('center', d3.forceCenter(output.clientWidth / 2, output.clientHeight / 2));

          // Create SVG elements for links and nodes
          const link = svg.append('g')
              .attr('stroke', '#999')
              .attr('stroke-opacity', 0.6)
              .selectAll('line')
              .data(graphData.links)
              .join('line')
              .attr('stroke-width', d => Math.sqrt(d.value));

          const node = svg.append('g')
              .selectAll('circle')
              .data(graphData.nodes)
              .join('circle')
              .attr('r', 5)
              .attr('fill', '#69b3a2')
              .call(d3.drag()
                  .on('start', dragstarted)
                  .on('drag', dragged)
                  .on('end', dragended));

          // Add titles to nodes
          node.append('title')
              .text(d => d.id);

          // Update node and link positions on each tick
          simulation.on('tick', () => {
              link
                  .attr('x1', d => d.source.x)
                  .attr('y1', d => d.source.y)
                  .attr('x2', d => d.target.x)
                  .attr('y2', d => d.target.y);

              node
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y);
          });

          // Drag functions
          function dragstarted(event, d) {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
          }

          function dragged(event, d) {
              d.fx = event.x;
              d.fy = event.y;
          }

          function dragended(event, d) {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
          }
      } catch (error) {
          console.error('Error plotting graph:', error);
      }
  }

  // For debouncing
  let timeoutIdDebounce;

  // Debouncing: executed after the specified delay (500 milliseconds) since the last input event.
  infield.addEventListener("input", function(event) {
      clearTimeout(timeoutIdDebounce);
      timeoutIdDebounce = setTimeout(function() {
          plotGraph(infield.value);
      }, 500); // Debounce delay set to 500 milliseconds
  });
  // Event listener for Plot It! button
  document.getElementById('plotit').addEventListener('click', function() {
      plotGraph(infield.value);
  });


  // Define available themes
  const themes = ["dark", "light", "valentine", "coffee"];

  // Function to toggle theme
  function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length; // Loop through themes
      const nextTheme = themes[nextIndex];
      document.documentElement.setAttribute("data-theme", nextTheme);
  }

  // Add click event listener to the theme button
  themeButton.addEventListener("click", toggleTheme);
});
