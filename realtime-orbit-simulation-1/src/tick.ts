import {
    Ball,
    EARTH_MASS_KG,
    EARTH_RADIUS_M,
    G,
    LOOP_DELTA,
    Vector2,
} from "./main";
import { drawText, renderContext } from "./render";

const velocity = (orbitRadiusM: number): number => {
    // G = kg^-1 * m^3 * s^-2
    // M = kg
    // r = m
    // GM(1/r) = kg^-1 * m^3 * s^-2 * kg * m^-1
    // GM(1/r) = kg^0 * m^2 * s^-2
    // v^2 = GM(1/r) = m^2/s^2
    // v = sqrt(GM(1/r)) = sqrt(m^2/s^2) = m/s = "velocity"

    // G[kg^-1 * m^3 * s^-2]
    // M[kg^1]
    // r[m^1]
    // GM(1/r)[kg^-1 * m^3 * s^-2 * kg^1 * m^-1]
    // GM(1/r)[kg^-1 * kg^1 * m^3 * m^-1 * s^-2]
    // GM(1/r)[kg^0 * m^2 * s^-2]
    // GM(1/r)[m^2 * s^-2]

    // v^2 = GM(1/r)
    const velocity = G * EARTH_MASS_KG * (1 / (orbitRadiusM + EARTH_RADIUS_M));
    return Math.sqrt(velocity);
};

const circumference = (orbitRadiusM: number) => {
    // c = 2 * PI * r
    const radius = orbitRadiusM + EARTH_RADIUS_M;
    return 2 * Math.PI * radius;
};

const rightUnitVector = (ball: Ball): Vector2 => {
    const len = Math.sqrt(ball.x ** 2 + ball.y ** 2);
    const normalX = ball.x / len;
    const normalY = ball.y / len;
    return { x: normalY, y: -normalX };
};

const RUNTIME_PER_HISTORY_ADDITION = 120;
let runtime = RUNTIME_PER_HISTORY_ADDITION - 1;

export const tick = (
    ball: Ball,
    history: Ball[],
    orbitRadiusM: number,
    tickSpeed: number
) => {
    const text = [
        `hastighed: ${velocity(orbitRadiusM)} m/s`,
        `omkreds: ${circumference(orbitRadiusM)} m`,
    ];
    let vel = velocity(orbitRadiusM) * LOOP_DELTA * tickSpeed;
    let right = rightUnitVector(ball);
    ball.x += vel * right.x;
    ball.y += vel * right.y;
    drawText(renderContext(), text);
    runtime++;
    if (runtime % RUNTIME_PER_HISTORY_ADDITION == 0) {
        history.push({ ...ball });
        runtime = 0;
    }
};
