import { System, SimulationContext } from "./exports.ts";

export class SystemHandler<
    Context extends SimulationContext = SimulationContext
> {
    private systems: System<Context>[] = [];

    public add(controller: System<Context>) {
        this.systems.push(controller);
    }

    public remove(controller: System<Context>) {
        this.systems = this.systems.filter((s) => s !== controller);
    }

    public start(ctx: Context) {
        [...this.systems].map((s) => s.start && s.start(ctx));
    }

    public tick(ctx: Context, deltaT: number) {
        [...this.systems].map((s) => s.tick && s.tick(ctx, deltaT));
    }
}
