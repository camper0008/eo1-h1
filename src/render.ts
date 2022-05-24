import { Ball, EARTH_RADIUS_M, RADIUS_PER_PIXEL } from "./main";

const BALL_RADIUS = 4;
const HISTORY_RADIUS = 2;

export const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
        ball.x / RADIUS_PER_PIXEL,
        ball.y / RADIUS_PER_PIXEL,
        BALL_RADIUS,
        0,
        360
    );
    ctx.fill();
};

export const drawText = (ctx: CanvasRenderingContext2D, lines: string[]) => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "16px monospace";
    for (let i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], -375, -375 + 16 * (i + 1));
    ctx.fill();
};

export const drawHistory = (ctx: CanvasRenderingContext2D, history: Ball[]) => {
    for (let i = 0; i < history.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.arc(
            history[i].x / RADIUS_PER_PIXEL,
            history[i].y / RADIUS_PER_PIXEL,
            HISTORY_RADIUS,
            0,
            360
        );
        ctx.fill();
    }
};

export const drawEarth = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(0, 0, EARTH_RADIUS_M / RADIUS_PER_PIXEL, 0, 360);
    ctx.fill();
};

export const renderContext = (): CanvasRenderingContext2D => {
    const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
    const ctx = canvas.getContext("2d")!;
    return ctx;
};
