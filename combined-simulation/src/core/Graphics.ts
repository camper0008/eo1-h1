import { Vector2d } from "./exports.ts";

export interface Graphics {
    clear(): void;
    setFill(red: number, green?: number, blue?: number, alpha?: number): void;
    setStroke(witdh: number, red: number, green?: number, blue?: number, alpha?: number): void;
    fillCircle(pos: Vector2d, radius: number): void;
}
