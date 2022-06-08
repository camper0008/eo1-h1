import {
    EntityHandler,
    Planet,
    SimulationContext,
    Vector2d,
    Satellite,
} from "./exports.ts";

export class MyContext extends SimulationContext {
    public constructor(
        entities: EntityHandler,
        public scale: number,
        public offset: Vector2d,
        public window: Window,
        public canvas: HTMLCanvasElement,
        public planet: Planet,
        public satellite: Satellite
    ) {
        super(entities);
    }
}
