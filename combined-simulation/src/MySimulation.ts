import {
    MyContext,
    Planet,
    Simulation,
    Graphics,
    MouseControls,
    Background,
    vec2d,
    Satellite,
    KeybindControls,
} from "./exports.ts";

export type MySimulationOptions = {
    planetRadius: number;
    planetMass: number;
    satelliteMass: number;
    satelliteDistance: number;
    satelliteSpeed: number;
    timeScale: number;
};

export class MySimulation extends Simulation {
    public constructor(
        canvas: HTMLCanvasElement,
        graphics: Graphics,
        {
            planetMass,
            planetRadius,
            satelliteMass,
            satelliteDistance,
            satelliteSpeed,
            timeScale,
        }: MySimulationOptions
    ) {
        super(graphics);
        this.timeScale = timeScale;
        this.systems.add(new MouseControls());
        this.entities.add(new Background());
        const planet = new Planet(planetMass, planetRadius);
        const satellite = new Satellite(
            satelliteMass,
            satelliteDistance,
            satelliteSpeed
        );
        this.entities.add(planet);
        this.entities.add(satellite);
        this.systems.add(new KeybindControls());
        this.ctx = new MyContext(
            this.entities,
            1,
            vec2d(0, 0),
            window,
            canvas,
            planet,
            satellite
        );
    }
}
