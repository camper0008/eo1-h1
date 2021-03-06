import { Graphics, vec2d, Vector2d } from "./exports.ts";

export class CanvasGraphics implements Graphics {
    private ctx: CanvasRenderingContext2D;

    public constructor(
        private canvas: HTMLCanvasElement,
        dimensions: Vector2d
    ) {
        this.canvas.width = dimensions.x;
        this.canvas.height = dimensions.y;
        this.ctx = canvas.getContext("2d")!;
    }

    public clear() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public dim() {
        return vec2d(this.canvas.width, this.canvas.height);
    }

    public setFill(red: number, green = red, blue = green, alpha = 1) {
        this.ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
    }

    public setStroke(
        width: number,
        red: number,
        green = red,
        blue = green,
        alpha = 1
    ) {
        this.ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
        this.ctx.lineWidth = width;
    }

    public fillCircle(pos: Vector2d, radius: number): void {
        this.ctx.beginPath();
        this.ctx.arc(
            pos.x,
            this.canvas.height - 1 - pos.y,
            radius,
            Math.PI * 2,
            0
        );
        this.ctx.fill();
    }

    public strokeCircle(pos: Vector2d, radius: number): void {
        this.ctx.beginPath();
        this.ctx.arc(
            pos.x,
            this.canvas.height - 1 - pos.y,
            radius,
            Math.PI * 2,
            0
        );
        this.ctx.stroke();
    }

    public strokeArc(
        pos: Vector2d,
        radius: number,
        start: number,
        end: number
    ): void {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, this.canvas.height - 1 - pos.y, radius, start, end);
        this.ctx.stroke();
    }

    public fillRect(pos: Vector2d, dim: Vector2d): void {
        this.ctx.fillRect(
            pos.x,
            this.canvas.height - 1 - pos.y - dim.y,
            dim.x,
            dim.y
        );
    }

    public strokeLine(a: Vector2d, b: Vector2d): void {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, this.canvas.height - 1 - a.y);
        this.ctx.lineTo(b.x, this.canvas.height - 1 - b.y);
        this.ctx.stroke();
    }

    public strokePath(path: Vector2d[]) {
        if (path.length <= 1) return;
        this.ctx.beginPath();
        this.ctx.moveTo(path[0].x, this.canvas.height - 1 - path[0].y);
        path.slice(1).forEach(({ x, y }) =>
            this.ctx.lineTo(x, this.canvas.height - 1 - y)
        );
        this.ctx.stroke();
    }

    public drawImage(image: HTMLImageElement, pos: Vector2d, dim?: Vector2d) {
        if (dim)
            this.ctx.drawImage(
                image,
                pos.x,
                this.canvas.height - 1 - pos.y - dim.y,
                dim.x,
                dim.y
            );
        else this.ctx.drawImage(image, pos.x, this.canvas.height - 1 - pos.y);
    }
}
