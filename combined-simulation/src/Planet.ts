import { Entity } from "./exports.ts";
import { Graphics } from "./exports.ts";
import { Vector2d } from "./exports.ts";
import { MyContext } from "./exports.ts";

export class Planet implements Entity<MyContext> {
    private pos: Vector2d = new Vector2d(0, 0);
    private scale = 1;
    private offset: Vector2d = new Vector2d(0, 0);

    public tick(ctx: MyContext): void {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
    }

    public render(g: Graphics): void {
        g.setFill(255);
        g.fillCircle(new Vector2d(g.dimensions().x / 2 + this.offset.x, g.dimensions().y / 2 + this.offset.y), 100 * this.scale);
    }
}
