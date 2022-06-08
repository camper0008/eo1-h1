export class Vector2d {
    public constructor(public x: number, public y: number) {}

    public copy(): Vector2d {
        return new Vector2d(this.x, this.y);
    }

    public length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
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

    public addN(n: number): Vector2d {
        this.x += n;
        this.y += n;
        return this;
    }

    public subtractN(n: number): Vector2d {
        this.x -= n;
        this.y -= n;
        return this;
    }

    public multiplyN(n: number): Vector2d {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public divideN(n: number): Vector2d {
        if (n === 0) throw new Error("cannot divide by zero");
        this.x /= n;
        this.y /= n;
        return this;
    }
}

export const vec2d = (x = 0, y = x) => new Vector2d(x, y);
