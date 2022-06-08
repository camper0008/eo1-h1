import {
    Debug,
    earthRadiusM,
    Entity,
    Graphics,
    gravityConstant,
    MyContext,
    vec2d,
    Vector2d,
} from "./exports.ts";

export class Satellite implements Entity<MyContext> {
    private pos: Vector2d = vec2d(0, earthRadiusM + 1000);
    // private vel: Vector2d = vec2d(-16970, -16970);
    private vel: Vector2d = vec2d(0, 0);
    // private vel: Vector2d = vec2d(0, 0);
    private mass = 10;
    private scale = 0;
    private offset: Vector2d = vec2d();

    private startTime = Date.now();

    public tick(ctx: MyContext, deltaT: number) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;

        const diff = ctx.planet.pos.copy().subtract(this.pos);

        const gravityForce =
            (gravityConstant * ctx.planet.mass * this.mass) /
            Math.max(diff.length(), 1) ** 2;

        const xRatio = diff.x / Math.max(diff.length(), 1);
        const yRatio = diff.y / Math.max(diff.length(), 1);

        const force = vec2d(gravityForce * xRatio, gravityForce * yRatio);

        const acceleration = force.divideN(this.mass).multiplyN(deltaT);

        Debug.setHtmlMonitorItem("vel before", this.vel);
        Debug.setHtmlMonitorItem("pos before", this.pos);
        Debug.setHtmlMonitorItem("deltaT", deltaT);
        Debug.setHtmlMonitorItem("runtime", Date.now() - this.startTime);

        this.vel = this.vel.add(acceleration);
        this.pos.add(this.vel.copy().multiplyN(deltaT));

        Debug.setHtmlMonitorItem("diff", diff);
        Debug.setHtmlMonitorItem("gravityForce", gravityForce);
        Debug.setHtmlMonitorItem("xRatio", xRatio);
        Debug.setHtmlMonitorItem("yRatio", yRatio);
        Debug.setHtmlMonitorItem("force", force);
        Debug.setHtmlMonitorItem("acceleration", acceleration);
        Debug.setHtmlMonitorItem("acceleration", diff);
        Debug.setHtmlMonitorItem("vel after", this.vel);
        Debug.setHtmlMonitorItem("pos after", this.pos);

        // debugger;
    }

    public render(g: Graphics) {
        g.setFill(0, 255, 0);
        g.fillCircle(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            1000000 * this.scale
        );
        g.setFill(255, 255, 0);
        g.fillRect(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            vec2d(1000000 * this.scale)
        );
    }
}
