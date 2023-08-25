import * as d3 from "d3";

export default function lines() {
  const svg = d3.select("#svg");

  const pointA = [0, 400];
  let pointB = [300, 100];
  // const pointB = d3.pointer('click');
  const pointC = [600, 400];

  const bezier = d3.path();

  bezier.moveTo(pointA[0], pointA[1]);
  // bezier.moveTo(...pointA)
  bezier.bezierCurveTo(200, 0, 0, 200, 200, 200);
  bezier.closePath();
  bezier.toString();

  let lineData = [[pointA, pointB]];

  const lineGenerator = d3.line();

  addEventListener("mousemove", (e) => {
    pointB = d3.pointer(e);
  });

  const loopie = () => {
    lineData = [[pointA, pointB]];

    lineData.push([pointB, pointC]);

    d3.range(30).forEach((d, i, a) => {
      const AtoB = d3.interpolate(pointA, pointB);
      const BtoC = d3.interpolate(pointB, pointC);
      const newEntry = [AtoB(d / a.length), BtoC(d / a.length)];
      lineData.push(newEntry);
    });

    const line = svg
      .selectAll("path")
      .data(lineData)
      .join("path")
      .attr("class", "line")
      .attr("stroke", (d, i, a) => {
        const gradient = d3.interpolate("orange", "blue");
        return gradient(i / a.length);
      })
      .attr("d", (d) => lineGenerator(d));
    requestAnimationFrame(loopie);
  };

  loopie();
}
