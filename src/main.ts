import { drawBall, drawEarth, drawHistory, renderContext } from "./render";
import "./style.css";
import { tick } from "./tick";

export interface Vector2 {
    x: number;
    y: number;
}

export type Ball = Vector2;

export const G = 6.674 * 10 ** -11;
export const EARTH_MASS_KG = 5.9722 * 10 ** 24;
export const EARTH_RADIUS_M = 6.3781 * 10 ** 6;
export const RADIUS_PER_PIXEL = (6.3781 * 10 ** 6) / 100;
export const LOOP_DELTA = 1;

const loop = (
    ctx: CanvasRenderingContext2D,
    history: Ball[],
    ball: Ball,
    orbitRadiusM: number
) => {
    ctx.clearRect(-375, -375, 750, 750);
    drawEarth(ctx);
    drawHistory(ctx, history);
    drawBall(ctx, ball);
    tick(ball, history, orbitRadiusM);
};

let oldInterval: number | undefined;

const initializeLoop = () => {
    const ctx = renderContext();
    const input = document.querySelector<HTMLInputElement>("#radius")!;
    const orbitRadiusKM = parseFloat(input.value);
    const orbitRadiusM = orbitRadiusKM * 1000;
    const earthGroundLayer = -EARTH_RADIUS_M - orbitRadiusM;

    const history: Ball[] = [];
    const ball = {
        x: 0,
        y: earthGroundLayer,
    };

    clearInterval(oldInterval);
    oldInterval = setInterval(() => {
        loop(ctx, history, ball, orbitRadiusM);
    }, LOOP_DELTA);
};

const main = () => {
    const ctx = renderContext();
    ctx.translate(375, 375);
    const input = document.querySelector<HTMLInputElement>("#radius")!;
    input.addEventListener("input", () => {
        initializeLoop();
    });
    initializeLoop();
};

main();
