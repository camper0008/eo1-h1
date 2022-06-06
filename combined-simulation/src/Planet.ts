import { Entity } from "./core/Entity.ts";
import { Graphics } from "./core/Graphics.ts";
import { Vector2d } from "./core/Vector2d.ts";
import { MyContext } from "./MyContext.ts";

export class Planet implements Entity<MyContext> {
    private pos: Vector2d = new Vector2d(0, 0);

    public tick(ctx: MyContext): void {
        const _a = ctx;
    }

    public render(g: Graphics): void {
        g.setFill(255);
        g.fillCircle(new Vector2d(0, 0,), 100);
    }
}
