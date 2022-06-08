import { Entity, Graphics, MyContext, Vector2d } from "./exports.ts";

export class Background implements Entity<MyContext> {
    private scale = 1;
    private offset: Vector2d = new Vector2d(0, 0);

    public tick(ctx: MyContext) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
    }

    public render(g: Graphics) {
        g.setFill(0);
        g.clear();
        g.setStroke(2, 255);
        this.renderRuler(g, 4);
    }

    private renderRuler(g: Graphics, ticklen: number) {
        g.strokeLine(
            new Vector2d(this.offset.x, 0),
            new Vector2d(this.offset.x, g.dim().y)
        );
        g.strokeLine(
            new Vector2d(0, this.offset.y),
            new Vector2d(g.dim().x, this.offset.y)
        );
        [10 ** -1, 10 ** 0, 10 ** 1, 10 ** 2, 10 ** 3, 10 ** 4, 10 ** 5].map(
            (n) => {
                const namingIsHard = (
                    x1: number,
                    y1: number,
                    x2: number = x1,
                    y2: number = y1
                ) =>
                    g.strokeLine(
                        new Vector2d(x1 + this.offset.x, y1 + this.offset.y),
                        new Vector2d(x2 + this.offset.x, y2 + this.offset.y)
                    );
                namingIsHard(n * this.scale, 0, undefined, ticklen);
                namingIsHard(n * 2 * this.scale, 0, undefined, ticklen);
                namingIsHard(n * 5 * this.scale, 0, undefined, ticklen);
                // g.strokeLine(
                //     new Vector2d(+this.offset.x, this.offset.y),
                //     new Vector2d(
                //         n * this.scale + this.offset.x,
                //         ticklen + this.offset.y
                //     )
                // );
                // g.strokeLine(
                //     new Vector2d(
                //         n * 2 * this.scale + this.offset.x,
                //         this.offset.y
                //     ),
                //     new Vector2d(
                //         n * 2 * this.scale + this.offset.x,
                //         ticklen + this.offset.y
                //     )
                // );
                // g.strokeLine(
                //     new Vector2d(
                //         n * 5 * this.scale + this.offset.x,
                //         this.offset.y
                //     ),
                //     new Vector2d(
                //         n * 5 * this.scale + this.offset.x,
                //         ticklen + this.offset.y
                //     )
                // );
                namingIsHard(0, n * this.scale, ticklen, undefined);
                namingIsHard(0, n * 2 * this.scale, ticklen, undefined);
                namingIsHard(0, n * 5 * this.scale, ticklen, undefined);
                // g.strokeLine(
                //     new Vector2d(this.offset.x, n * this.scale + this.offset.y),
                //     new Vector2d(
                //         ticklen + this.offset.x,
                //         n * this.scale + this.offset.y
                //     )
                // );
                // g.strokeLine(
                //     new Vector2d(
                //         this.offset.x,
                //         n * 2 * this.scale + this.offset.y
                //     ),
                //     new Vector2d(
                //         ticklen + this.offset.x,
                //         n * 2 * this.scale + this.offset.y
                //     )
                // );
                // g.strokeLine(
                //     new Vector2d(
                //         this.offset.x,
                //         n * 5 * this.scale + this.offset.y
                //     ),
                //     new Vector2d(
                //         ticklen + this.offset.x,
                //         n * 5 * this.scale + this.offset.y
                //     )
                // );
            }
        );
    }
}
