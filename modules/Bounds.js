import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Bounds
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Bounds {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        const hw = w / 2;
        const hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }

    get params() {
        return [this.x, this.y, this.w, this.h];
    }

    offsetOuter(offset) {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x - offset,
            y - offset,
            w + offset * 2,
            h + offset * 2
        );
    }

    offsetInner(offset) {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x + offset,
            y + offset,
            w - offset * 2,
            h - offset * 2
        );
    }
}

export default Bounds;
