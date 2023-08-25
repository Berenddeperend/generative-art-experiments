import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");

  // const lineData = [
  //   [
  //     [0, 0],
  //     [50, 100],
  //   ],
  // ];

  const lineData = d3.range(100).map((d) => {
    return [
      [d * 10, (d * d) / 10],
      [d * 5, d * 2],
    ];

    // return d3.range(10).map((e) => {
    //   return [e * 10, d * 10];
    // });
  });

  const lineGenerator = d3.line();

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
}
