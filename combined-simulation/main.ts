
const rgb = (red: number, green = red, blue = green, alpha = 1) => `rgba(${red},${green},${blue},${alpha})`;

type Vector2d = {
    x: number,
    y: number,
}

const vec2d = (x: number, y: number): Vector2d => ({ x, y });

type SimulationObject = {
    pos: Vector2d,
    render: (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        scale: number,
    ) => void,
}

const drawPlanet = (
    pos: Vector2d,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scale: number,
) => {
    ctx.fillStyle = rgb(100);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 100 * scale, Math.PI * 2, 0);
    ctx.fill();
}

const makePlanet = (): SimulationObject => {
    const pos = vec2d(0, 0);
    return {
        pos, render: (canvas, ctx, scale) => drawPlanet(pos, canvas, ctx, scale),
    }
}

const main = (maybeCanvas: HTMLCanvasElement | null) => {
    const canvas = maybeCanvas!;
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d')!;

    const objects: SimulationObject[] = [
        makePlanet(),
    ];

    let scale = 1;
    const offset = vec2d(0, 0);

    setInterval(() => {
        ctx.fillStyle = rgb(0);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        [...objects].map((object) => object.render(canvas, ctx, scale));
    }, 10);

    return { 
        setScale: (value: number) => scale = value,
    };
}

// deno-lint-ignore no-unused-vars
const { setScale } = main(document.querySelector('#combined-simulation'));
