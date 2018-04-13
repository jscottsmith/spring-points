//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Velocity
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Velocity {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    flip() {
        // reflection on both axis
        this.vx *= -1;
        this.vy *= -1;
        return this;
    }

    flipX() {
        // reflection on x axis
        this.vx *= -1;
        return this;
    }

    flipY() {
        // reflection on y axis
        this.vy *= -1;
        return this;
    }

    multiply(scalar) {
        this.vx *= scalar;
        this.vy *= scalar;
        return this;
    }

    divide(scalar) {
        this.vx /= scalar;
        this.vy /= scalar;
        return this;
    }
}

export default Velocity;
