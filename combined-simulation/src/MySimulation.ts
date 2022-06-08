import { Vector2d, MyContext, Planet, Simulation, Graphics, MouseControls, Background } from "./exports.ts";

export class MySimulation extends Simulation {
    public constructor (
        canvas: HTMLCanvasElement,
        graphics: Graphics,
    ) {
        super (graphics);
        this.controllers.add(new MouseControls());
        this.entities.add(new Background());
        this.entities.add(new Planet());
        this.ctx = new MyContext(
            this.entities,
            1,
            new Vector2d(0, 0),
            window,
            canvas,
        );
    }
}
