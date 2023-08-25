import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");
  // Sample data for multiple lines
  const lineData = [
    [
      [0, 100],
      [50, 50],
      [100, 150],
      [150, 80],
      [200, 200],
    ],
    [
      [0, 200],
      [50, 150],
      [100, 100],
      [150, 130],
      [200, 50],
    ],
  ];

  // Create a line generator
  const lineGenerator = d3.line();

  const drawLines = () => {
    svg
      .selectAll("path")
      .data(lineData)
      .join((enter) =>
        enter
          .append("path")
          .attr("stroke", "white")
          .transition()
          .attr("stroke", "black"),
      )
      .transition()
      .duration(1000)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", (d) => lineGenerator(d));
  };

  drawLines();

  d3.timeout(() => {
    lineData[0][1] = [50, 100];
  });

  d3.timeout(() => {
    lineData.push([
      [0, 200],
      [100, 130],
    ]);

    drawLines();
  }, 1000);
}
