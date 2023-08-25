import * as d3 from "d3";
import * as dat from "dat.gui";
import { range, curve, curveBasis } from "d3";

export default function lines() {
  const gui = new dat.GUI({ name: "ys" });
  const guiFolder = gui.addFolder("lines");
  const lineGenerator = d3.line();

  const offsets = { lineCount: 10, length: 200, y: 30, x: 30 };

  gui.add(offsets, "lineCount", 0, 500);
  gui.add(offsets, "length", 0, 500);
  gui.add(offsets, "y", 0, 100);
  gui.add(offsets, "x", 0, 100);

  addEventListener("mousemove", (e) => {
    const [x, y] = d3.pointer(e);
    console.log(x, y);
    offsets.x = x;
    offsets.y = y;
  });

  const svg = d3.select("#svg");

  const loopie = () => {
    svg
      .selectAll("path")
      .data(range(offsets.lineCount))
      .join("path")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", (d) => {
        return d3.line().curve(d3.curveCatmullRom.alpha(0.5))([
          [10 + d * 10, 0],
          [offsets.x, offsets.y],
          [10 + d * 10, 400],
        ]);

        // return d3.line().x([10, 20, 10]).y(10);

        // .curve(d3.curveCatmullRom.alpha(0.5));
      });

    requestAnimationFrame(loopie);
  };
  loopie();
}
