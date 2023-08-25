import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");
  // Sample data for multiple lines
  const lineData = [
    [
      [10, 100],
      [50, 50],
      [100, 150],
      [150, 80],
      [200, 200],
    ],
    [
      [10, 200],
      [50, 150],
      [100, 100],
      [150, 130],
      [200, 50],
    ],
  ];

  // Create a line generator
  const lineGenerator = d3.line();

  const lines = svg
    .selectAll("path")
    .data(lineData)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", (d) => lineGenerator(d));

  d3.interval(() => {
    lineData.push([
      [0, 200],
      [100, 130],
    ]);

    // console.log(lineData);
  }, 1000);
}
