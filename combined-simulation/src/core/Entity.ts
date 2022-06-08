import { Graphics, SimulationContext } from './exports.ts';

export interface Entity<Context extends SimulationContext = SimulationContext> {
    tick?(ctx: Context): void;
    render?(g: Graphics): void;
}
