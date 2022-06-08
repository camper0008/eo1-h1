import {
    MyContext,
    Earth,
    Simulation,
    Graphics,
    MouseControls,
    Background,
    vec2d,
    Satellite,
    NamingIsHard3,
} from "./exports.ts";

export class MySimulation extends Simulation {
    public constructor(canvas: HTMLCanvasElement, graphics: Graphics) {
        super(graphics);
        this.systems.add(new MouseControls());
        this.entities.add(new Background());
        const planet = new Earth();
        this.entities.add(planet);
        this.entities.add(new Satellite());
        this.entities.add(new NamingIsHard3());
        this.ctx = new MyContext(
            this.entities,
            1,
            vec2d(0, 0),
            window,
            canvas,
            planet
        );
    }
}
