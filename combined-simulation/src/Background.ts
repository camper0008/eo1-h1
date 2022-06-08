import { Entity, Graphics, MyContext } from "./exports.ts";

export class Background implements Entity<MyContext> {

    public render(g: Graphics) {
        g.setFill(0);
        g.clear();
    }

}
