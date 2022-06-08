import {
    Entity,
    Graphics,
    MyContext,
    range,
    vec2d,
    Vector2d,
} from "./exports.ts";

export class Background implements Entity<MyContext> {
    private scale = 1;
    private offset: Vector2d = vec2d();

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
        g.strokeLine(vec2d(this.offset.x, 0), vec2d(this.offset.x, g.dim().y));
        g.strokeLine(vec2d(0, this.offset.y), vec2d(g.dim().x, this.offset.y));
        range(6, -1)
            .map((n) => 10 ** n)
            .map((n) => {
                const makeRulerNotch = (
                    x1: number,
                    y1: number,
                    x2: number = x1,
                    y2: number = y1
                ) => {
                    const createQuadrantNotch: (...args: number[]) => void = (
                        x1,
                        y1,
                        x2,
                        y2
                    ) =>
                        g.strokeLine(
                            vec2d(x1, y1).add(this.offset),
                            vec2d(x2, y2).add(this.offset)
                        );
                    createQuadrantNotch(x1, y1, x2, y2);
                    createQuadrantNotch(-x1, y1, -x2, y2);
                    createQuadrantNotch(x1, -y1, x2, -y2);
                    createQuadrantNotch(-x1, -y1, -x2, -y2);
                };
                makeRulerNotch(n * this.scale, 0, undefined, ticklen);
                makeRulerNotch(n * 2 * this.scale, 0, undefined, ticklen);
                makeRulerNotch(n * 5 * this.scale, 0, undefined, ticklen);
                makeRulerNotch(0, n * this.scale, ticklen, undefined);
                makeRulerNotch(0, n * 2 * this.scale, ticklen, undefined);
                makeRulerNotch(0, n * 5 * this.scale, ticklen, undefined);
            });
    }
}
