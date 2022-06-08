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
    private vel: Vector2d = vec2d(8000, 0);
    // private vel: Vector2d = vec2d(0, 0);
    private mass = 10;
    private scale = 0;
    private offset: Vector2d = vec2d();

    private startTime = Date.now();

    private firstTimeTickCalled = true;
    public tick(ctx: MyContext, deltaT: number) {
        if (this.firstTimeTickCalled) {
            this.firstTimeTickCalled = false;
            ctx.window.addEventListener("keydown", (e) => {
                if (e.key === "n") {
                    ctx.offset.x = -this.pos.x * this.scale + 500;
                    ctx.offset.y = -this.pos.y * this.scale + 500;
                    // ctx.scale = 1;
                } else if (e.key === "m") {
                    ctx.offset.x = 500;
                    ctx.offset.y = 500;
                    // ctx.scale = 0.000055;
                } else if (e.key === "N") {
                    ctx.scale = 1;
                    ctx.offset.x = -this.pos.x * this.scale + 500;
                    ctx.offset.y = -this.pos.y * this.scale + 500;
                } else if (e.key === "M") {
                    ctx.scale = 0.000055;
                    ctx.offset.x = 500;
                    ctx.offset.y = 500;
                }
            });
        }

        this.scale = ctx.scale;
        this.offset = ctx.offset;

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
        g.setFill(0, 255, 0);
        g.fillCircle(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            100 * this.scale
        );
        g.setStroke(2, 255, 0, 0);
        g.strokeLine(
            vec2d(this.pos.x * this.scale + this.offset.x, 0),
            vec2d(this.pos.x * this.scale + this.offset.x, g.dim().y)
        );
        g.strokeLine(
            vec2d(0, this.pos.y * this.scale + this.offset.y),
            vec2d(g.dim().x, this.pos.y * this.scale + this.offset.y)
        );
    }
}
