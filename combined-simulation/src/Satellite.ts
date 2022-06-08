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
    public pos: Vector2d = vec2d(0, earthRadiusM + 1000);
    public vel: Vector2d = vec2d(8000, 0);

    private mass = 10;
    private scale = 0;
    private offset: Vector2d = vec2d();

    private traces: Vector2d[] = [];

    private startTime = Date.now();

    public tick(ctx: MyContext, deltaT: number) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;

        this.traces.push(this.pos.copy());

        const diff = ctx.planet.pos.copy().subtract(this.pos);

        const gravityForce =
            (gravityConstant * ctx.planet.mass * this.mass) /
            Math.max(diff.length(), 1) ** 2;

        const xRatio = diff.x / Math.max(diff.length(), 1);
        const yRatio = diff.y / Math.max(diff.length(), 1);

        const XYratio = diff.copy().divideN(Math.max(diff.length(), 1));

        const force = vec2d(gravityForce).multiply(XYratio);

        const acceleration = force.divideN(this.mass).multiplyN(deltaT);

        {
            Debug.setHtmlMonitorItem("scale", this.scale);
            Debug.setHtmlMonitorItem("offset", this.offset);
            Debug.setHtmlMonitorItem("pos before", this.pos);
            Debug.setHtmlMonitorItem("vel before", this.vel);
            Debug.setHtmlMonitorItem("deltaT", deltaT);
            Debug.setHtmlMonitorItem("runtime", Date.now() - this.startTime);
        }

        this.vel = this.vel.add(acceleration);
        this.pos.add(this.vel.copy().multiplyN(deltaT));

        {
            Debug.setHtmlMonitorItem("diff", diff);
            Debug.setHtmlMonitorItem("gravityForce", gravityForce);
            Debug.setHtmlMonitorItem("xRatio", xRatio);
            Debug.setHtmlMonitorItem("yRatio", yRatio);
            Debug.setHtmlMonitorItem("force", force);
            Debug.setHtmlMonitorItem("acceleration", acceleration);
            Debug.setHtmlMonitorItem("acceleration", diff);
            Debug.setHtmlMonitorItem("vel after", this.vel);
            Debug.setHtmlMonitorItem("pos after", this.pos);
        }

        // debugger;
    }

    public render(g: Graphics) {
        g.setStroke(2, 255, 255, 255);
        g.strokePath(
            this.traces.map((trace) =>
                trace.copy().multiplyN(this.scale).add(this.offset)
            )
        );

        g.setFill(0, 255, 0);
        g.fillCircle(
            this.pos.copy().multiplyN(this.scale).add(this.offset),
            100 * this.scale
        );
        // g.setStroke(2, 255, 0, 0);
        // g.strokeLine(
        //     vec2d(this.pos.x * this.scale + this.offset.x, 0),
        //     vec2d(this.pos.x * this.scale + this.offset.x, g.dim().y)
        // );
        // g.strokeLine(
        //     vec2d(0, this.pos.y * this.scale + this.offset.y),
        //     vec2d(g.dim().x, this.pos.y * this.scale + this.offset.y)
        // );
    }
}
