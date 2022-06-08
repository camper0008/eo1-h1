import { Vector2d } from "./exports.ts";

export interface Graphics {
    clear(): void;
    dim(): Vector2d;
    setFill(red: number, green?: number, blue?: number, alpha?: number): void;
    setStroke(
        witdh: number,
        red: number,
        green?: number,
        blue?: number,
        alpha?: number
    ): void;
    fillCircle(pos: Vector2d, radius: number): void;
    strokeCircle(pos: Vector2d, radius: number): void;
    strokeArc(pos: Vector2d, radius: number, start: number, end: number): void;
    fillRect(pos: Vector2d, dim: Vector2d): void;
    strokeLine(a: Vector2d, b: Vector2d): void;
    strokePath(path: Vector2d[]): void;
    drawImage(image: HTMLImageElement, pos: Vector2d, dim?: Vector2d): void;
}
