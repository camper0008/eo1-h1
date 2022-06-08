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
        let before = Date.now();
        this.interval = setInterval(() => {
            const now = Date.now();
            const deltaT = (now - before) / 1000;
            before = now;
            this.systems.tick(this.ctx, deltaT);
            this.entities.tick(this.ctx, deltaT);
            this.entities.render(this.graphics);
        }, 10);
    }

    public stop() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
    }
}
