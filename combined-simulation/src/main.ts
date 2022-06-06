import { CanvasGraphics } from "./core/CanvasGraphics.ts";
import { Vector2d } from "./core/Vector2d.ts";
import { MySimulation } from "./MySimulation.ts";

const main = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#combined-simulation')!
    const graphics = new CanvasGraphics(canvas, new Vector2d(500, 500));
    const simulation = new MySimulation(graphics);
    simulation.start();
}

main();
