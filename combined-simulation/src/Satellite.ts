import {
    Entity,
    Graphics,
    gravityConstant,
    MyContext,
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
        console.log(diff);
        const planetMass = ctx.planet.mass; // M = [kg]
        const planetRadius = ctx.planet.radius; // r = [m]
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
            gravityForce * Math.sin(angle),
            gravityForce * Math.cos(angle)
        );

        // F = m * a

        // a [] = F [N = (m * kg) / s^2] / m [kg]
        // a [] = F / m [N = (m * kg) / s^2 * kg]
        // a [] = F / m [m / s^2]
        // a [m / s^2] = F / m
        // v = a [m / s^2] * t [s]
        // v = a * t [(m / s^2) * s]
        // v [m / s] = a * t

        this.vel.add(force.multiply(vec2d(this.mass).multiply(vec2d(0.01))));
        this.pos.add(this.vel);
    }

    public render(g: Graphics) {
        g.setFill(0, 255, 0);
        g.fillRect(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            vec2d(1000, 1000).multiply(vec2d(this.scale))
        );
    }
}
