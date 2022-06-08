import {
    Entity,
    Graphics,
    gravityConstant,
    MyContext,
    vec2d,
    Vector2d,
} from "./exports.ts";

export class NamingIsHard3 implements Entity<MyContext> {
    private pos: Vector2d = vec2d();
    private radius = 6.3781 * 10 ** 6;
    private offset: Vector2d = vec2d();
    private scale = 0;

    private trash = true;
    public tick(ctx: MyContext) {
        this.pos = ctx.planet.pos.copy();
        this.offset = ctx.offset;
        this.scale = ctx.scale;
        if (this.trash) {
            this.trash = false;
            this.calculateOrbit(ctx);
        }
    }

    public calculateOrbit(ctx: MyContext) {
        const planetMass = ctx.planet.mass; // M = [kg]
        const neededVelocity = Math.sqrt(
            (gravityConstant * planetMass) / this.radius
        );
    }

    public render(g: Graphics) {
        g.setStroke(2, 255, 0, 0);
        g.strokeCircle(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            (this.radius / 1000) * this.scale
        );
    }
}
