import { CanvasGraphics, Vector2d, MySimulation } from './exports.ts';

const main = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#combined-simulation')!
    const graphics = new CanvasGraphics(canvas, new Vector2d(500, 500));
    const simulation = new MySimulation(canvas, graphics);
    simulation.start();
}

main();
