import Point from './Point';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Spring
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

// defaults and constants
const ELASTICITY = 0.1; // elastic force toward the origin
const DAMPING = 0.9;
const MASS = 1;

class Spring extends Point {
    constructor({ x, y, isFixed, mass, elasticity, damping }) {
        super(x, y);
        this.ox = x; // original origin x, never changes
        this.oy = y; // original origin y, never changes
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y

        this.isFixed = isFixed; // indeicates whether this point can be moved

        // spring constants
        this.mass = mass || MASS;
        this.elasticity = elasticity || ELASTICITY;
        this.damping = damping || DAMPING;
    }

    applyForce(x, y) {
        this.fx += x;
        this.fy += y;
    }

    // attractors = []; // just testing
    // addAttractor(point) {
    //     this.attractors = [...this.attractors, point];
    // }
    // setForceFromAttractors() {
    //     // currently unused, was testing out an
    //     this.attractors.forEach(point => {
    //         const { staticDistance } = point;
    //         // current distance
    //         // const distance = this.distance(point);
    //         // if (distance > staticDistance)
    //         // const delta = distance - staticDistance;
    //         // force to origin, difference multiplied by elasticity constant
    //         const ofx = (point.x - this.x) * this.elasticity;
    //         const ofy = (point.y - this.y) * this.elasticity;
    //         this.applyForce(ofx, ofy);
    //     });
    // }

    setSpringForce() {
        // force to origin, difference multiplied by elasticity constant
        const fx = (this.ox - this.x) * this.elasticity;
        const fy = (this.oy - this.y) * this.elasticity;

        // sum forces
        this.fx += fx;
        this.fy += fy;
    }

    solveVelocity() {
        if (this.fx === 0 && this.fy === 0) return;

        // acceleration = force / mass;
        const ax = this.fx / this.mass;
        const ay = this.fy / this.mass;

        // velocity, apply damping then ad acceleration
        this.vx = this.damping * this.vx + ax;
        this.vy = this.damping * this.vy + ay;

        // add velocity to center and top/left
        this.x += this.vx;
        this.y += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;
    }

    update = () => {
        if (this.isFixed) return;
        this.setSpringForce();
        this.solveVelocity();
    };

    draw = ({ ctx, pointer }) => {
        // temporary, just to see what's happening
        // const { x, y } = this;
        // ctx.strokeStyle = '#ccc';
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.stroke();
    };
}

export default Spring;
