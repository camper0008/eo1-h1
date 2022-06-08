import { Graphics, Vector2d } from "./exports.ts";

export class CanvasGraphics implements Graphics {
    private ctx: CanvasRenderingContext2D;

    public constructor (
        private canvas: HTMLCanvasElement,
        dimensions: Vector2d,
    ) {
        this.canvas.width = dimensions.x;
        this.canvas.height = dimensions.y;
        this.ctx = canvas.getContext('2d')!;
    }

    public clear() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public dimensions() {
        return new Vector2d(this.canvas.width, this.canvas.height);
    }

    public setFill(red: number, green = red, blue = green, alpha = 1) {
        this.ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
    }

    public setStroke(width: number, red: number, green = red, blue = green, alpha = 1) {
        this.ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
        this.ctx.lineWidth = width;
    }

    public fillCircle(pos: Vector2d, radius: number): void {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, Math.PI*2, 0);
        this.ctx.fill();
    }
}
