import {
    EntityHandler,
    Earth,
    SimulationContext,
    Vector2d,
} from "./exports.ts";

export class MyContext extends SimulationContext {
    public constructor(
        entities: EntityHandler,
        public scale: number,
        public offset: Vector2d,
        public window: Window,
        public canvas: HTMLCanvasElement,
        public planet: Earth
    ) {
        super(entities);
    }
}