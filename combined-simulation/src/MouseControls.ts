import { MyContext, System, vec2d, Vector2d } from "./exports.ts";

export class MouseControls implements System<MyContext> {
    private dragstart: Vector2d | null = null;
    private dragstartoffset: Vector2d = vec2d();

    private calculateDragOffset(
        ctx: MyContext,
        dragStartPos: Vector2d,
        dragEndPos: Vector2d
    ) {
        const dragstop = vec2d(dragEndPos.x, dragEndPos.y);
        const drag = dragstop
            .copy()
            .subtract(dragStartPos)
            .multiply(
                vec2d(
                    ctx.canvas.width / ctx.canvas.clientWidth,
                    ctx.canvas.height / ctx.canvas.clientHeight
                )
            );

        ctx.offset = this.dragstartoffset.copy().add(drag);
    }

    public start(ctx: MyContext) {
        const sessionScale = sessionStorage.getItem("scale");
        if (sessionScale) ctx.scale = parseFloat(sessionScale);

        const sessionOffsetX = sessionStorage.getItem("offsetX");
        if (sessionOffsetX)
            ctx.offset.x = parseFloat(sessionStorage.getItem("offsetX")!);

        const sessionOffsetY = sessionStorage.getItem("offsetY");
        if (sessionOffsetY)
            ctx.offset.y = parseFloat(sessionStorage.getItem("offsetY")!);

        ctx.canvas.addEventListener("mousedown", (e) => {
            this.dragstart = vec2d(e.x, e.y);
            this.dragstartoffset = ctx.offset;
            ctx.canvas.style.cursor = "move";
        });
        ctx.window.addEventListener("mousemove", (e) => {
            if (!this.dragstart) return;
            this.calculateDragOffset(ctx, this.dragstart, vec2d(e.x, e.y));
        });
        ctx.window.addEventListener("mouseup", (e) => {
            if (!this.dragstart) return;
            this.calculateDragOffset(ctx, this.dragstart, vec2d(e.x, e.y));
            this.dragstart = null;
            ctx.canvas.style.cursor = "unset";
            sessionStorage.setItem("offsetX", ctx.offset.x.toString());
            sessionStorage.setItem("offsetY", ctx.offset.y.toString());
        });
        ctx.canvas.addEventListener("wheel", (e) => {
            ctx.scale *= e.deltaY > 0 ? 0.9 : 1.1;
            sessionStorage.setItem("scale", ctx.scale.toString());
        });
    }
}
