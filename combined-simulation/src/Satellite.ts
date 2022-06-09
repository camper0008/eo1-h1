import {
    Debug,
    Entity,
    Graphics,
    gravityConstant,
    MyContext,
    notZero,
    vec2d,
    Vector2d,
} from "./exports.ts";

export class Satellite implements Entity<MyContext> {
    public pos: Vector2d = vec2d();
    public vel: Vector2d = vec2d();

    private scale = 0;
    private offset: Vector2d = vec2d();

    private traces: Vector2d[] = [];

    private startTime = Date.now();

    public constructor(public mass = 10, distance: number, speed: number) {
        this.pos = vec2d(0, distance);
        this.vel = vec2d(speed, 0);
    }

    private calculateNewVelocityAndPosition(ctx: MyContext, deltaT: number) {
        const radiusVector = ctx.planet.pos.copy().subtract(this.pos);

        const GM = gravityConstant * ctx.planet.mass;
        const absoluteGravityForce =
            (GM * this.mass) / notZero(radiusVector.length()) ** 2;

        const radiusUnitVector = radiusVector
            .copy()
            .divideN(notZero(radiusVector.length()));

        const force = vec2d(absoluteGravityForce).multiply(radiusUnitVector);

        const acceleration = force.divideN(this.mass).multiplyN(deltaT);

        this.vel = this.vel.add(acceleration);
        this.pos.add(this.vel.copy().multiplyN(deltaT));

        // returning values for debugging purposes
        return {
            absoluteGravityForce,
            radiusVector,
            radiusUnitVector,
            force,
            acceleration,
        };
    }

    public tick(ctx: MyContext, deltaT: number) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
        const [scaleBefore, offsetBefore] = [this.scale, this.offset.copy()];
        this.traces.push(this.pos.copy());

        const {
            absoluteGravityForce,
            acceleration,
            force,
            radiusUnitVector,
            radiusVector,
        } = this.calculateNewVelocityAndPosition(ctx, deltaT);

        {
            Debug.setHtmlMonitorItem("scale", scaleBefore);
            Debug.setHtmlMonitorItem("offset", offsetBefore);
            Debug.setHtmlMonitorItem("pos before", this.pos);
            Debug.setHtmlMonitorItem("vel before", this.vel);
            Debug.setHtmlMonitorItem("deltaT", deltaT);
            Debug.setHtmlMonitorItem("runtime", Date.now() - this.startTime);
            Debug.setHtmlMonitorItem("radiusVector", radiusVector);
            Debug.setHtmlMonitorItem(
                "absoluteGravityForce",
                absoluteGravityForce
            );
            Debug.setHtmlMonitorItem("radiusUnitVector", radiusUnitVector);
            Debug.setHtmlMonitorItem("force", force);
            Debug.setHtmlMonitorItem("acceleration", acceleration);
            Debug.setHtmlMonitorItem("acceleration", radiusVector);
            Debug.setHtmlMonitorItem("vel after", this.vel);
            Debug.setHtmlMonitorItem("pos after", this.pos);
        }
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
    }
}
