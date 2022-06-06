import { Graphics } from "./core/Graphics.ts";
import { Simulation } from "./core/Simulation.ts";
import { MyContext } from "./MyContext.ts";
import { Planet } from "./Planet.ts";

export class MySimulation extends Simulation {
    public constructor (
        graphics: Graphics,
    ) {
        super (graphics);
        this.entities.add(new Planet());
        this.ctx = new MyContext(this.entities);
    }
}
