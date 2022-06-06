import { Entity, Graphics, SimulationContext } from "./exports.ts";

export class EntityHandler<Context extends SimulationContext = SimulationContext> {
    private entities: Entity[] = [];

    public add(object: Entity) {
        this.entities.push(object);
    }

    public remove(entity: Entity) {
        this.entities = this.entities.filter((e) => e !== entity);
    }

    public tick(ctx: Context) {
        [...this.entities].forEach((e) => e.tick(ctx));
    }

    public render(g: Graphics) {
        [...this.entities].forEach((e) => e.render(g));
    }
}
