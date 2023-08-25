import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");

  // const lineData = [
  //   [
  //     [0, 0],
  //     [50, 100],
  //   ],
  // ];

  let lineData = d3.range(100).map((d) => {
    return [
      [d * 10, (d * d) / 10],
      [d * 5, d * 2],
    ];
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

  let incrementer = 0;

  setInterval(() => {
    incrementer++;

    lineData = d3.range(100).map((d) => {
      return [
        [(d * 10) / incrementer, (d * incrementer) % 10],
        [d * 5, incrementer * 20],
      ];
    });

    drawLines();
  }, 1000);

  drawLines();
}
