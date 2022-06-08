import { SimulationContext } from "./exports.ts";

export interface System<Context extends SimulationContext = SimulationContext> {
    start?(ctx: Context): void;
    tick?(ctx: Context): void;
}
