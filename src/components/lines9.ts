import * as d3 from "d3";
import * as dat from "dat.gui";
import { range } from "d3";

export default function lines() {
  const gui = new dat.GUI({ name: "ys" });
  const guiFolder = gui.addFolder("lines");
  const lineGenerator = d3.line();

  const offsets = { lineCount: 10, length: 200, y: 30, x: 30 };

  gui.add(offsets, "lineCount", 0, 500);
  gui.add(offsets, "length", 0, 500);
  gui.add(offsets, "y", 0, 100);
  gui.add(offsets, "x", 0, 100);

  const svg = d3.select("#svg");

  const loopie = () => {
    const y = d3.scaleLinear().range([0, offsets.y]);
    const x = d3.scaleLinear().range([0, offsets.x]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d, i) => y(i));

    svg
      .selectAll("path")
      .data(range(offsets.lineCount))
      .join("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", line());

    // requestAnimationFrame(loopie);
    setInterval(loopie, 1000);
  };

  loopie();
}
