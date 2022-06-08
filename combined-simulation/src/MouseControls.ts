import { MyContext, System, Vector2d } from "./exports.ts";

export class MouseControls implements System<MyContext> {
    private dragstart: Vector2d | null = null;
    private dragstartoffset: Vector2d = new Vector2d(0, 0);

    public start(ctx: MyContext) {
        ctx.canvas.addEventListener('mousedown', (e) => {
            this.dragstart = new Vector2d(e.x, e.y);
            this.dragstartoffset = ctx.offset;
            ctx.canvas.style.cursor = 'move'
        });
        ctx.window.addEventListener('mousemove', (e) => {
            if (!this.dragstart)
                return;
            const dragstop = new Vector2d(e.x, e.y);
            const drag = dragstop.copy().subtract(this.dragstart);
            ctx.offset = this.dragstartoffset.copy().add(drag);
        });
        ctx.window.addEventListener('mouseup', (e) => {
            if (!this.dragstart)
                return;
            const dragstop = new Vector2d(e.x, e.y);
            const drag = dragstop.copy().subtract(this.dragstart);
            this.dragstart = null;
            ctx.offset = this.dragstartoffset.copy().add(drag);
            ctx.canvas.style.cursor = 'default'
        });
        ctx.canvas.addEventListener('wheel', (e) => {
            ctx.scale *= e.deltaY > 0 ? 0.9 : 1.1;
        });
    }
}
