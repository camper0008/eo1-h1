import { Graphics, Vector2d, MyContext, Entity, vec2d } from "./exports.ts";

export class Planet implements Entity<MyContext> {
    public pos: Vector2d = vec2d(0, 0);
    private scale = 1;
    private offset: Vector2d = vec2d(0, 0);

    public constructor(public mass: number, public radius: number) {}

    public tick(ctx: MyContext): void {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
    }

    public render(g: Graphics): void {
        g.setFill(0, 100, 230);
        g.fillCircle(
            this.pos.copy().multiply(vec2d(this.scale)).add(this.offset),
            this.radius * this.scale
        );
    }
}
