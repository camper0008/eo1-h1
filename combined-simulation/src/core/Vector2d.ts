
export class Vector2d {
    public constructor (
        public x: number,
        public y: number,
    ) {}

    public copy(): Vector2d {
        return new Vector2d(this.x, this.y);
    }

    public length(): number {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    public add(v: Vector2d): Vector2d {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public subtract(v: Vector2d): Vector2d {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public multiply(v: Vector2d): Vector2d {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
}
