import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");
  // Sample data for multiple lines
  const lineData = [
    [
      [0, 0],
      [50, 100],
    ],
  ];

  // Create a line generator
  const lineGenerator = d3.line().curve(d3.curveBasis); // Choose a curve type (e.g., curveBasis, curveCardinal, etc.)

  const drawLines = () => {
    svg
      .selectAll("path")
      .data(lineData)
      .join("path")
      .transition()
      .duration(1000)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", (d) => lineGenerator(d));
  };

  drawLines();

  let incrementer = 0;

  setInterval(() => {
    incrementer++;

    const newData = [incrementer * 10, d3.randomUniform(0, 100)()];

    lineData[0].push(newData);
    drawLines();
  }, 400);

  // d3.timeout(() => {
  //   lineData.push([
  //     [0, 200],
  //     [100, 130],
  //   ]);
  //
  //   drawLines();
  // }, 1000);
}
