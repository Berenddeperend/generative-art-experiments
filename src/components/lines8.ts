import * as d3 from "d3";
import * as dat from "dat.gui";

export default function lines() {
  const gui = new dat.GUI({ name: "things" });
  const guiFolder = gui.addFolder("lines");

  const offsets = { x: 200, y: 200, number: 76, radius: 3, angle: 0 };

  gui.add(offsets, "x", 0, 500);
  gui.add(offsets, "y", 0, 500);
  gui.add(offsets, "number", 0, 500);
  gui.add(offsets, "radius", 0, 10);
  gui.add(offsets, "angle", 0, 10);

  const svg = d3.select("#svg");

  const scale = d3.scaleLinear().domain([-1, 1]).range([1.5, 2.5]);

  addEventListener("mousemove", (e) => {
    // const [x, y] = d3.pointer(e);
    // offsets.x = x;
    // offsets.angle = y / 100;
  });

  const loopie = () => {
    offsets.angle += 0.001;
    const spiral = Array.from({ length: offsets.number }, (_, i) => [
      (Math.PI / Math.sin(offsets.angle)) * i, // angle (in radians)
      offsets.radius * i, // radius
    ]);

    // 1.5 tot 2.6

    const yoink = d3.lineRadial()(spiral);
    svg
      .selectAll("path")
      .data([yoink])
      .join("path")
      .attr("style", `transform: translate(${offsets.x}px, ${offsets.y}px);`)
      .attr("stroke", "black")
      .attr("fill", "none")

      .attr("d", yoink);

    d3.select("body")
      .selectAll("p")
      .data([offsets.angle])
      .join("p")
      .attr("style", "position: absolute; top: 0; left: 0;")
      // .data(offsets.angle)
      .text(scale());

    requestAnimationFrame(loopie);
  };

  loopie();
}
