//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Point
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get position() {
        return [this.x, this.y];
    }

    delta(point) {
        return [this.x - point.x, this.y - point.y];
    }

    distance(point) {
        const dx = point.x - this.x;
        const dy = point.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    movePointAtAngle(point, angle, distance) {
        this.x = point.x + Math.cos(angle) * distance;
        this.y = point.y + Math.sin(angle) * distance;
        return this;
    }

    applyVelocity(velocity) {
        this.x += velocity.vx;
        this.y += velocity.vy;
        return this;
    }

    angleRadians(point) {
        // radians = atan2(deltaY, deltaX)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x);
    }

    angleDeg(point) {
        // degrees = atan2(deltaY, deltaX) * (180 / PI)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x) * (180 / Math.PI);
    }
}

export default Point;
