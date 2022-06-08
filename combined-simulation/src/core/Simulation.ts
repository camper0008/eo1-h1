import {
    SystemHandler,
    EntityHandler,
    Graphics,
    SimulationContext,
} from "./exports.ts";

export abstract class Simulation<
    Context extends SimulationContext = SimulationContext
> {
    private interval: number | null = null;
    protected entities = new EntityHandler();
    protected systems = new SystemHandler();
    protected ctx = new SimulationContext(this.entities);

    public constructor(private graphics: Graphics) {}

    public start() {
        this.systems.start(this.ctx);
        this.interval = setInterval(() => {
            this.systems.tick(this.ctx);
            this.entities.tick(this.ctx);
            this.entities.render(this.graphics);
        }, 10);
    }

    public stop() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
    }
}
