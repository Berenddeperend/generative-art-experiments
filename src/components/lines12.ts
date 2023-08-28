import * as d3 from "d3";
import * as dat from "dat.gui";
import { range, curve, curveBasis } from "d3";

export default function lines() {
  const gui = new dat.GUI({ name: "ys" });
  const guiFolder = gui.addFolder("lines");
  const lineGenerator = d3.line();

  const offsets = {
    lineCount: 10,
    length: 400,
    spacing: 10,
    y: 30,
    x: 30,
    margin: 100,
  };

  gui.add(offsets, "lineCount", 0, 500);
  gui.add(offsets, "length", 0, 1000);
  gui.add(offsets, "spacing", 0, 100);
  gui.add(offsets, "y", 0, 1000);
  gui.add(offsets, "x", 0, 1000);
  gui.add(offsets, "margin", 0, 100);

  addEventListener("mousemove", (e) => {
    const [x, y] = d3.pointer(e);
    console.log(x, y);
    offsets.x = x - offsets.margin;
    offsets.y = y - offsets.margin;
  });

  const svg = d3.select("#svg").attr("xmlns", "http://www.w3.org/2000/svg");

  const makeSine = (i: number) => {
    return d3.range(0, 15, 0.2).map((k) => {
      return [
        Math.sin(k) * 15 + offsets.margin + i * offsets.spacing,
        k * offsets.spacing + offsets.margin + offsets.length * 0.3,
      ];
    });
  };

  const loopie = () => {
    svg
      .selectAll("path")
      .data(range(offsets.lineCount))
      .join("path")
      .attr("stroke", "black")

      .attr("fill", "none")
      .attr("d", (d) => {
        return d3.line().curve(d3.curveCatmullRom.alpha(0.9))([
          [offsets.margin + d * offsets.spacing, offsets.margin],
          [
            offsets.margin + d * offsets.spacing,
            offsets.margin + offsets.length * 0.3,
          ],
          ...makeSine(d),
          [
            offsets.margin + d * offsets.spacing,
            offsets.margin + offsets.length * 0.7,
          ],
          [
            offsets.margin + d * offsets.spacing,
            offsets.length + offsets.margin,
          ],
        ]);
      });

    requestAnimationFrame(loopie);
  };
  loopie();
}
