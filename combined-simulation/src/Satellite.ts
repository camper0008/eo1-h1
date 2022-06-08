import {
    Entity,
    Graphics,
    gravityConstant,
    MyContext,
    notRamHungryPrint,
    ticksPerSecond,
    vec2d,
    Vector2d,
} from "./exports.ts";

export class Satellite implements Entity<MyContext> {
    private pos: Vector2d = vec2d(0, 0);
    private vel: Vector2d = vec2d(0, 0);
    private mass = 10;
    private scale = 0;
    private offset: Vector2d = vec2d();

    public tick(ctx: MyContext) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;

        const diff = ctx.planet.pos.copy().subtract(this.pos);
        const planetMass = ctx.planet.mass; // M = [kg]
        // F = GMm/r^2
        const gravityForce =
            (gravityConstant * planetMass * this.mass) / diff.length() ** 2; // F [N] = (G [m^3 / (kg * s^2)] * M [kg] * m [kg]) / (r [m])^2

        // F[N] = (G [m^3 / (kg * s^2)] * M [kg] * m [kg]) / (r [m])^2
        // F[N] = G [m^3 * kg^-1 * s^-2] * M [kg] * m [kg] * r^2 [m^-2]
        // F[N] = [m^3 * kg^-1 * s^-2] * [kg] * [kg] * [m^-2]
        // N = [m^3 * kg^-1 * s^-2] * [kg] * [kg] * [m^-2]
        // N = m^3 * kg^-1 * s^-2 * kg * kg * m^-2
        // N = m^3 * m^-2 * kg^2 * kg^-1 * s^-2
        // N = m * kg * s^-2

        const angle = Math.atan(diff.y / diff.x);

        const force = vec2d(
            gravityForce * Math.cos(angle),
            gravityForce * Math.sin(angle)
        );

        // F = m * a

        // a [] = F [N = (m * kg) / s^2] / m [kg]
        // a [] = F / m [N = (m * kg) / s^2 * kg]
        // a [] = F / m [m / s^2]
        // a [m / s^2] = F / m
        // v = a [m / s^2] * t [s]
        // v = a * t [(m / s^2) * s]
        // v [m / s] = a * t

        const acceleration = force.multiply(vec2d(this.mass ** -1));
        const tickAdjustedAcceleration = acceleration.multiply(
            vec2d(ticksPerSecond ** -1)
        );
        notRamHungryPrint(0, 10, diff, tickAdjustedAcceleration);

        this.vel.add(tickAdjustedAcceleration);
        this.pos.add(this.vel.copy().multiply(vec2d(ticksPerSecond ** -1)));

        // debugger;
    }

    public render(g: Graphics) {
        g.setFill(0, 255, 0);
        g.fillCircle(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            1000 * this.scale
        );

        g.setStroke(5, 125, 125, 255);
        g.strokeArc(vec2d(0).add(this.offset), 100, 0, Math.PI * 0.25);
    }
}
