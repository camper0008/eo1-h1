// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class EntityHandler {
    entities = [];
    add(object) {
        this.entities.push(object);
    }
    remove(entity) {
        this.entities = this.entities.filter((e)=>e !== entity
        );
    }
    tick(ctx, deltaT) {
        [
            ...this.entities
        ].forEach((e)=>e.tick && e.tick(ctx, deltaT)
        );
    }
    render(g) {
        [
            ...this.entities
        ].forEach((e)=>e.render && e.render(g)
        );
    }
}
class SimulationContext {
    constructor(entities){
        this.entities = entities;
    }
    entities;
}
class SystemHandler {
    systems = [];
    add(controller) {
        this.systems.push(controller);
    }
    remove(controller) {
        this.systems = this.systems.filter((s)=>s !== controller
        );
    }
    start(ctx) {
        [
            ...this.systems
        ].map((s)=>s.start && s.start(ctx)
        );
    }
    tick(ctx, deltaT) {
        [
            ...this.systems
        ].map((s)=>s.tick && s.tick(ctx, deltaT)
        );
    }
}
class Vector2d {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector2d(this.x, this.y);
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    addN(n) {
        this.x += n;
        this.y += n;
        return this;
    }
    subtractN(n) {
        this.x -= n;
        this.y -= n;
        return this;
    }
    multiplyN(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    divideN(n) {
        if (n === 0) throw new Error("cannot divide by zero");
        this.x /= n;
        this.y /= n;
        return this;
    }
    x;
    y;
}
const vec2d = (x = 0, y = x)=>new Vector2d(x, y)
;
const range = (min, max, step = 1)=>{
    const res = [];
    for(let i = min; i < max; i += step){
        res.push(i);
    }
    return res;
};
const notZero = (v, min = 1)=>Math.max(v, min)
;
const notRamHungryPrintIterations = {};
const notRamHungryPrint = (id, max, ...msg)=>{
    if (notRamHungryPrintIterations[id] === undefined) notRamHungryPrintIterations[id] = 0;
    if (notRamHungryPrintIterations[id] < max) console.log(...msg);
    notRamHungryPrintIterations[id]++;
};
const htmlMonitoringItems = {};
let htmlMonitoringInterval = null;
const setHtmlMonitorItem = (key, value)=>{
    const div = document.querySelector("#monitor");
    if (!div) return;
    htmlMonitoringItems[key] = value;
    if (htmlMonitoringInterval === null) htmlMonitoringInterval = setInterval(()=>{
        div.innerHTML = `<pre><code>${JSON.stringify(htmlMonitoringItems, null, 4)}</code></pre>`;
    }, 100);
};
const mod = {
    notRamHungryPrint: notRamHungryPrint,
    setHtmlMonitorItem: setHtmlMonitorItem
};
class CanvasGraphics {
    ctx;
    constructor(canvas, dimensions){
        this.canvas = canvas;
        this.canvas.width = dimensions.x;
        this.canvas.height = dimensions.y;
        this.ctx = canvas.getContext("2d");
    }
    clear() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    dim() {
        return vec2d(this.canvas.width, this.canvas.height);
    }
    setFill(red, green = red, blue = green, alpha = 1) {
        this.ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
    }
    setStroke(width, red, green = red, blue = green, alpha = 1) {
        this.ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
        this.ctx.lineWidth = width;
    }
    fillCircle(pos, radius) {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, this.canvas.height - 1 - pos.y, radius, Math.PI * 2, 0);
        this.ctx.fill();
    }
    strokeCircle(pos, radius) {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, this.canvas.height - 1 - pos.y, radius, Math.PI * 2, 0);
        this.ctx.stroke();
    }
    strokeArc(pos, radius, start, end) {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, this.canvas.height - 1 - pos.y, radius, start, end);
        this.ctx.stroke();
    }
    fillRect(pos, dim) {
        this.ctx.fillRect(pos.x, this.canvas.height - 1 - pos.y - dim.y, dim.x, dim.y);
    }
    strokeLine(a, b) {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, this.canvas.height - 1 - a.y);
        this.ctx.lineTo(b.x, this.canvas.height - 1 - b.y);
        this.ctx.stroke();
    }
    strokePath(path) {
        if (path.length <= 1) return;
        this.ctx.beginPath();
        this.ctx.moveTo(path[0].x, this.canvas.height - 1 - path[0].y);
        path.slice(1).forEach(({ x , y  })=>this.ctx.lineTo(x, this.canvas.height - 1 - y)
        );
        this.ctx.stroke();
    }
    drawImage(image, pos, dim) {
        if (dim) this.ctx.drawImage(image, pos.x, this.canvas.height - 1 - pos.y - dim.y, dim.x, dim.y);
        else this.ctx.drawImage(image, pos.x, this.canvas.height - 1 - pos.y);
    }
    canvas;
}
class Simulation {
    interval;
    entities;
    systems;
    ctx;
    timeScale;
    constructor(graphics){
        this.graphics = graphics;
        this.interval = null;
        this.entities = new EntityHandler();
        this.systems = new SystemHandler();
        this.ctx = new SimulationContext(this.entities);
        this.timeScale = 1;
    }
    start() {
        this.systems.start(this.ctx);
        let before = Date.now();
        this.interval = setInterval(()=>{
            const now = Date.now();
            const deltaT = (now - before) / 1000 * this.timeScale;
            before = now;
            this.systems.tick(this.ctx, deltaT);
            this.entities.tick(this.ctx, deltaT);
            this.entities.render(this.graphics);
        }, 10);
    }
    stop() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
    }
    graphics;
}
const earthMassKg = 5972200000000000000000000;
const earthRadiusM = 6378100;
class KeybindControls {
    followSatellite = false;
    start(ctx) {
        ctx.window.addEventListener("keydown", (e)=>{
            this.followSatellite = false;
            if (e.key === "n") {
                ctx.offset.x = -ctx.satellite.pos.x * ctx.scale + 500;
                ctx.offset.y = -ctx.satellite.pos.y * ctx.scale + 500;
            } else if (e.key === "m") {
                ctx.offset.x = 500;
                ctx.offset.y = 500;
            } else if (e.key === "N") {
                ctx.scale = 1;
                ctx.offset.x = -ctx.satellite.pos.x * ctx.scale + 500;
                ctx.offset.y = -ctx.satellite.pos.y * ctx.scale + 500;
            } else if (e.key === "M") {
                ctx.scale = 0.000055;
                ctx.offset.x = 500;
                ctx.offset.y = 500;
            } else if (e.key === "b") {
                this.followSatellite = true;
            }
        });
    }
    tick(ctx) {
        if (this.followSatellite) {
            ctx.offset.x = -ctx.satellite.pos.x * ctx.scale + 500;
            ctx.offset.y = -ctx.satellite.pos.y * ctx.scale + 500;
        }
    }
}
class Background {
    scale = 1;
    offset = vec2d();
    tick(ctx) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
    }
    render(g) {
        g.setFill(0);
        g.clear();
        g.setStroke(2, 255);
        this.renderRuler(g, 4);
    }
    renderRuler(g, ticklen) {
        g.strokeLine(vec2d(this.offset.x, 0), vec2d(this.offset.x, g.dim().y));
        g.strokeLine(vec2d(0, this.offset.y), vec2d(g.dim().x, this.offset.y));
        range(-1, 10).map((n)=>10 ** n
        ).map((n)=>{
            const makeRulerNotch = (x11, y11, x21 = x11, y21 = y11)=>{
                const createQuadrantNotch = (x1, y1, x2, y2)=>g.strokeLine(vec2d(x1, y1).add(this.offset), vec2d(x2, y2).add(this.offset))
                ;
                createQuadrantNotch(x11, y11, x21, y21);
                createQuadrantNotch(-x11, y11, -x21, y21);
                createQuadrantNotch(x11, -y11, x21, -y21);
                createQuadrantNotch(-x11, -y11, -x21, -y21);
            };
            makeRulerNotch(n * this.scale, 0, undefined, ticklen);
            makeRulerNotch(n * 2 * this.scale, 0, undefined, ticklen);
            makeRulerNotch(n * 5 * this.scale, 0, undefined, ticklen);
            makeRulerNotch(0, n * this.scale, ticklen, undefined);
            makeRulerNotch(0, n * 2 * this.scale, ticklen, undefined);
            makeRulerNotch(0, n * 5 * this.scale, ticklen, undefined);
        });
    }
}
class MyContext extends SimulationContext {
    constructor(entities, scale, offset, window, canvas, planet, satellite){
        super(entities);
        this.scale = scale;
        this.offset = offset;
        this.window = window;
        this.canvas = canvas;
        this.planet = planet;
        this.satellite = satellite;
    }
    scale;
    offset;
    window;
    canvas;
    planet;
    satellite;
}
class MouseControls {
    dragstart = null;
    dragstartoffset = vec2d();
    calculateDragOffset(ctx, dragStartPos, dragEndPos) {
        const dragstop = vec2d(dragEndPos.x, dragEndPos.y);
        const drag = dragstop.copy().subtract(dragStartPos).multiply(vec2d(ctx.canvas.width / ctx.canvas.clientWidth, ctx.canvas.height / ctx.canvas.clientHeight)).multiply(vec2d(1, -1));
        ctx.offset = this.dragstartoffset.copy().add(drag);
    }
    start(ctx) {
        const sessionScale = sessionStorage.getItem("scale");
        const sessionOffsetX = sessionStorage.getItem("offsetX");
        const sessionOffsetY = sessionStorage.getItem("offsetY");
        if (sessionScale) ctx.scale = parseFloat(sessionScale);
        if (sessionOffsetX) ctx.offset.x = parseFloat(sessionOffsetX);
        if (sessionOffsetY) ctx.offset.y = parseFloat(sessionOffsetY);
        ctx.canvas.addEventListener("mousedown", (e)=>{
            this.dragstart = vec2d(e.x, e.y);
            this.dragstartoffset = ctx.offset;
            ctx.canvas.style.cursor = "move";
        });
        ctx.window.addEventListener("mousemove", (e)=>{
            if (!this.dragstart) return;
            this.calculateDragOffset(ctx, this.dragstart, vec2d(e.x, e.y));
        });
        ctx.window.addEventListener("mouseup", (e)=>{
            if (!this.dragstart) return;
            this.calculateDragOffset(ctx, this.dragstart, vec2d(e.x, e.y));
            this.dragstart = null;
            ctx.canvas.style.cursor = "unset";
            sessionStorage.setItem("offsetX", ctx.offset.x.toString());
            sessionStorage.setItem("offsetY", ctx.offset.y.toString());
        });
        ctx.canvas.addEventListener("wheel", (e)=>{
            ctx.scale *= e.deltaY > 0 ? 0.9 : 1.1;
            sessionStorage.setItem("scale", ctx.scale.toString());
        });
    }
}
class Planet {
    pos;
    scale;
    offset;
    constructor(mass, radius){
        this.mass = mass;
        this.radius = radius;
        this.pos = vec2d(0, 0);
        this.scale = 1;
        this.offset = vec2d(0, 0);
    }
    tick(ctx) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
    }
    render(g) {
        g.setFill(0, 100, 230);
        g.fillCircle(this.pos.copy().multiply(vec2d(this.scale)).add(this.offset), this.radius * this.scale);
    }
    mass;
    radius;
}
class Satellite {
    pos;
    vel;
    scale;
    offset;
    traces;
    startTime;
    constructor(mass = 10, distance, speed){
        this.mass = mass;
        this.pos = vec2d();
        this.vel = vec2d();
        this.scale = 0;
        this.offset = vec2d();
        this.traces = [];
        this.startTime = Date.now();
        this.pos = vec2d(0, distance);
        this.vel = vec2d(speed, 0);
    }
    calculateNewVelocityAndPosition(ctx, deltaT) {
        const radiusVector = ctx.planet.pos.copy().subtract(this.pos);
        const GM = 0.00000000006674 * ctx.planet.mass;
        const absoluteGravityForce = GM * this.mass / notZero(radiusVector.length()) ** 2;
        const radiusUnitVector = radiusVector.copy().divideN(notZero(radiusVector.length()));
        const force = vec2d(absoluteGravityForce).multiply(radiusUnitVector);
        const acceleration = force.divideN(this.mass).multiplyN(deltaT);
        this.vel = this.vel.add(acceleration);
        this.pos.add(this.vel.copy().multiplyN(deltaT));
        return {
            absoluteGravityForce,
            radiusVector,
            radiusUnitVector,
            force,
            acceleration
        };
    }
    tick(ctx, deltaT) {
        this.scale = ctx.scale;
        this.offset = ctx.offset;
        const [scaleBefore, offsetBefore] = [
            this.scale,
            this.offset.copy()
        ];
        const { absoluteGravityForce , acceleration , force , radiusUnitVector , radiusVector ,  } = this.calculateNewVelocityAndPosition(ctx, deltaT);
        {
            mod.setHtmlMonitorItem("scale", scaleBefore);
            mod.setHtmlMonitorItem("offset", offsetBefore);
            mod.setHtmlMonitorItem("pos before", this.pos);
            mod.setHtmlMonitorItem("vel before", this.vel);
            mod.setHtmlMonitorItem("deltaT", deltaT);
            mod.setHtmlMonitorItem("runtime", Date.now() - this.startTime);
            mod.setHtmlMonitorItem("radiusVector", radiusVector);
            mod.setHtmlMonitorItem("absoluteGravityForce", absoluteGravityForce);
            mod.setHtmlMonitorItem("radiusUnitVector", radiusUnitVector);
            mod.setHtmlMonitorItem("force", force);
            mod.setHtmlMonitorItem("acceleration", acceleration);
            mod.setHtmlMonitorItem("acceleration", radiusVector);
            mod.setHtmlMonitorItem("vel after", this.vel);
            mod.setHtmlMonitorItem("pos after", this.pos);
        }
        this.traces.push(this.pos.copy());
    }
    render(g) {
        g.setStroke(2, 255, 255, 255);
        g.strokePath(this.traces.map((trace)=>trace.copy().multiplyN(this.scale).add(this.offset)
        ));
        g.setFill(0, 255, 0);
        g.fillCircle(this.pos.copy().multiplyN(this.scale).add(this.offset), 100 * this.scale);
    }
    mass;
}
class MySimulation extends Simulation {
    constructor(canvas, graphics, { planetMass , planetRadius , satelliteMass , satelliteDistance , satelliteSpeed , timeScale  }){
        super(graphics);
        this.timeScale = timeScale;
        this.systems.add(new MouseControls());
        this.entities.add(new Background());
        const planet = new Planet(planetMass, planetRadius);
        const satellite = new Satellite(satelliteMass, satelliteDistance, satelliteSpeed);
        this.entities.add(planet);
        this.entities.add(satellite);
        this.systems.add(new KeybindControls());
        this.ctx = new MyContext(this.entities, 1, vec2d(0, 0), window, canvas, planet, satellite);
    }
}
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
    simulateButton: "#cs-simulate"
};
const main = ()=>{
    const q = (s)=>document.querySelector(s)
    ;
    const canvas = q(htmlIds.canvas);
    const presetSelector = q(htmlIds.presetSelector);
    const planetRadiusInput = q(htmlIds.planetRadiusInput);
    const planetMassInput = q(htmlIds.planetMassInput);
    const satSurfaceDstInput = q(htmlIds.satSurfaceDstInput);
    const satAbsDstInput = q(htmlIds.satAbsDstInput);
    const satMassInput = q(htmlIds.satMassInput);
    const satSpeedInput = q(htmlIds.satSpeedInput);
    const calculateSpeedButton = q(htmlIds.calcSpeedButton);
    const tickSpeedInput = q(htmlIds.tickSpeedInput);
    const simulateButton = q(htmlIds.simulateButton);
    const v = (e)=>{
        const r = parseFloat(e.value);
        if (r === undefined || r === null || isNaN(r)) throw new Error(`cannot use value '${r}' from "#${e.id}"`);
        return r;
    };
    presetSelector.addEventListener("input", ()=>{
        console.log(presetSelector.value);
        if (presetSelector.value === "earth") {
            planetRadiusInput.value = earthRadiusM.toPrecision(4);
            planetMassInput.value = earthMassKg.toPrecision(4);
        }
    });
    satSurfaceDstInput.addEventListener("input", ()=>{
        if (!satSurfaceDstInput.value) return;
        const dst = v(satSurfaceDstInput) + v(planetRadiusInput);
        satAbsDstInput.value = dst.toExponential(3);
    });
    calculateSpeedButton.addEventListener("click", ()=>{
        const speed = Math.sqrt(0.00000000006674 * v(planetMassInput) * (1 / v(satAbsDstInput)));
        satSpeedInput.value = speed.toExponential(4);
    });
    const graphics = new CanvasGraphics(canvas, vec2d(1000, 1000));
    let simulation = null;
    simulateButton.addEventListener("click", ()=>{
        if (simulation) simulation.stop();
        simulation = new MySimulation(canvas, graphics, {
            planetMass: v(planetMassInput),
            planetRadius: v(planetRadiusInput),
            satelliteDistance: v(satAbsDstInput),
            satelliteMass: v(satMassInput),
            satelliteSpeed: v(satSpeedInput),
            timeScale: v(tickSpeedInput)
        });
        simulation.start();
    });
};
main();
