import { CanvasGraphics, MySimulation, vec2d } from "./exports.ts";

const main = () => {
    const canvas = document.querySelector<HTMLCanvasElement>(
        "#combined-simulation"
    )!;
    const graphics = new CanvasGraphics(canvas, vec2d(1000, 1000));
    const simulation = new MySimulation(canvas, graphics);
    simulation.start();
};

main();
