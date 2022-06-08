import {
    CanvasGraphics,
    gravityConstant,
    earthMassKg,
    earthRadiusM,
    MySimulation,
    vec2d,
} from "./exports.ts";

const htmlIds = {
    canvas: "#combined-simulation",
    presetSelector: "#cs-presets",
    planetRadiusInput: "#cs-planet-radius",
    planetMassInput: "#cs-planet-mass",
    satSurfaceDstInput: "#cs-satellite-surface-distance",
    satAbsDstInput: "#cs-satellite-absolute-distance",
    satMassInput: "#cs-satellite-mass",
    satSpeedInput: "#cs-satellite-speed",
    calcSpeedButton: "#cs-calc-satellite-speed",
    tickSpeedInput: "#cs-tick-speed",
    simulateButton: "#cs-simulate",
};

const main = () => {
    const q = <T extends HTMLElement>(s: string) =>
        document.querySelector<T>(s)!;
    const canvas = q<HTMLCanvasElement>(htmlIds.canvas);
    const presetSelector = q<HTMLSelectElement>(htmlIds.presetSelector);
    const planetRadiusInput = q<HTMLInputElement>(htmlIds.planetRadiusInput);
    const planetMassInput = q<HTMLInputElement>(htmlIds.planetMassInput);
    const satSurfaceDstInput = q<HTMLInputElement>(htmlIds.satSurfaceDstInput);
    const satAbsDstInput = q<HTMLInputElement>(htmlIds.satAbsDstInput);
    const satMassInput = q<HTMLInputElement>(htmlIds.satMassInput);
    const satSpeedInput = q<HTMLInputElement>(htmlIds.satSpeedInput);
    const calculateSpeedButton = q<HTMLButtonElement>(htmlIds.calcSpeedButton);
    const tickSpeedInput = q<HTMLInputElement>(htmlIds.tickSpeedInput);
    const simulateButton = q<HTMLButtonElement>(htmlIds.simulateButton);

    const v = (e: HTMLInputElement) => {
        const r = parseFloat(e.value);
        if (r === undefined || r === null || isNaN(r))
            throw new Error(`cannot use value '${r}' from "#${e.id}"`);
        return r;
    };

    presetSelector.addEventListener("input", () => {
        console.log(presetSelector.value);
        if (presetSelector.value === "earth") {
            planetRadiusInput.value = earthRadiusM.toPrecision(4);
            planetMassInput.value = earthMassKg.toPrecision(4);
        }
    });

    satSurfaceDstInput.addEventListener("input", () => {
        if (!satSurfaceDstInput.value) return;
        const dst = v(satSurfaceDstInput) + v(planetRadiusInput);
        satAbsDstInput.value = dst.toExponential(3);
    });

    calculateSpeedButton.addEventListener("click", () => {
        const speed =
            (gravityConstant * v(planetMassInput) * v(satMassInput)) /
            v(satAbsDstInput);
        satSpeedInput.value = speed.toExponential(3);
    });

    const graphics = new CanvasGraphics(canvas, vec2d(1000, 1000));

    let simulation: MySimulation | null = null;
    simulateButton.addEventListener("click", () => {
        if (simulation) simulation.stop();
        simulation = new MySimulation(canvas, graphics, {
            planetMass: v(planetMassInput),
            planetRadius: v(planetRadiusInput),
            satelliteDistance: v(satAbsDstInput),
            satelliteMass: v(satMassInput),
            satelliteSpeed: v(satSpeedInput),
            timeScale: v(tickSpeedInput),
        });
        simulation.start();
    });
};

main();
