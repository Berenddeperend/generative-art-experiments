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
  addEventListener("mousemove", (e) => {
    const [x, y] = d3.pointer(e);
    offsets.x = x;
    offsets.y = y;
  });

  const loopie = () => {
    offsets.angle += 0.01;
    const spiral = Array.from({ length: offsets.number }, (_, i) => [
      (Math.PI / offsets.angle) * i, // angle (in radians)
      offsets.radius * i, // radius
    ]);

    const yoink = d3.lineRadial()(spiral);
    svg
      .selectAll("path")
      .data([yoink])
      .join("path")
      .attr("style", `transform: translate(${offsets.x}px, ${offsets.y}px);`)
      .attr("stroke", "black")
      .attr("fill", "none")

      .attr("d", yoink);

    requestAnimationFrame(loopie);
  };

  loopie();
}
