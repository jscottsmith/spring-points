import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Spring
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

const ELASTICITY = 0.002;
const DAMPING = 0.999;
const MASS = 1;
const MOUSE_STRENGTH = 5;
const MOUSE_ATTRACT = true;

class Spring extends Point {
    constructor(x, y) {
        super(x, y);
        this.ox = x; // original origin x, never changes
        this.oy = y; // original origin y, never changes
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y

        // spring constants
        this.mass = MASS;
        this.elasticity = ELASTICITY;
        this.damping = DAMPING;

        // config const
        this.mouseStrength = MOUSE_STRENGTH;
        this.mouseAttract = MOUSE_ATTRACT;
    }

    applyForce(x, y) {
        this.fx += x;
        this.fy += y;
    }

    setForceFromMouse({ x, y }) {
        const dx = this.x - x;
        const dy = this.y - y;
        const angle = this.angleRadians({ y, x });

        let dist = this.mouseStrength / Math.sqrt(dx * dx + dy * dy);

        if (this.mouseAttract) {
            dist *= -1;
        }

        // move force point at angle
        const fx = Math.cos(angle) * dist;
        const fy = Math.sin(angle) * dist;

        this.applyForce(fx, fy);
    }

    applySpringForce() {
        // force to origin, difference multiplied by elasticity constant
        const ofx = (this.ox - this.x) * this.elasticity;
        const ofy = (this.oy - this.y) * this.elasticity;

        // sum forces
        const fx = this.fx + ofx;
        const fy = this.fy + ofy;

        // acceleration = force / mass;
        const ax = fx / this.mass;
        const ay = fy / this.mass;

        // velocity
        this.vx = this.damping * this.vx + ax;
        this.vy = this.damping * this.vy + ay;

        // add velocity to center and top/left
        this.x += this.vx;
        this.y += this.vy;
        this.cx += this.vx;
        this.cy += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;
    }

    update = ({ pointer }) => {
        this.setForceFromMouse(pointer.position);
        this.applySpringForce();
    };

    draw = ({ ctx, pointer }) => {
        const { x, y } = this;

        // temporary, just to see what's happening
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    };
}

export default Spring;
