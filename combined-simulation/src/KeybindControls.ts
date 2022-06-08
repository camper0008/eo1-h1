import { MyContext, System } from "./exports.ts";

export class KeybindControls implements System<MyContext> {
    private followSatellite = false;

    public start(ctx: MyContext) {
        ctx.window.addEventListener("keydown", (e) => {
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

    public tick(ctx: MyContext) {
        if (this.followSatellite) {
            ctx.offset.x = -ctx.satellite.pos.x * ctx.scale + 500;
            ctx.offset.y = -ctx.satellite.pos.y * ctx.scale + 500;
        }
    }
}
